import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCountryById,
  getLeagueStatisticsById,
  getSquadWithPlayerById,
  getTeamById,
  getTeamInfoById,
} from "../api";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeagueScreen = styled.div`
  width: 100%;
  height: 3000px;
  color: white;
  background-color: #272a36;
`;

const MainBanner = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  margin-bottom: 40px;
`;

const TeamBanner = styled.div`
  display: flex;
`;

const NextMatch = styled.div`
  font-size: 20px;
  margin-right: 20px;
`;

const TeamImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

const NextMatchTitle = styled.div``;

const NextMatchConents = styled.div`
  display: flex;
`;

const Squads = styled.div``;

const SquadsTab = styled.div``;

const SquadsTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const SquadsContents = styled.div`
  font-size: 15px;
  display: flex;
`;

const PlayerImg = styled.img`
  width: 50px;
  height: 50px;
`;

const SquadsContent = styled.div`
  display: flex;
`;

const Slider = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 140px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 20px;
`;

function TeamInfo() {
  const {
    state: {
      leagueName,
      leagueId,
      seasonId,
      leagueLogo,
      countryId,
      teamId,
      teamName,
      currentRound,
    },
  } = useLocation();

  // 팀 상세 정보
  const { isLoading: teamInfoLoading, data: teamInfoData } = useQuery(
    ["teamInfo", { teamId, seasonId }],
    () => getTeamInfoById(teamId, seasonId),
    {
      enabled: !!seasonId && !!teamId,
      refetchOnMount: "always",
    }
  );

  // 국가 정보
  const { isLoading: countryLoading, data: countrydata } = useQuery(
    ["countryId", countryId],
    () => getCountryById(countryId),
    {
      enabled: !!countryId,
      refetchOnMount: "always",
    }
  );

  // 시즌 상세 정보
  const { isLoading: seasonLoading, data: seasondata } = useQuery(
    ["seasonId", seasonId],
    () => getLeagueStatisticsById(seasonId).then((response) => response.data),
    {
      enabled: !!seasonId,
      refetchOnMount: "always",
    }
  );

  // 팀 스쿼드 정보
  const { isLoading: squadLoading, data: squadsdata } = useQuery(
    [
      ["seasonId", "teamId"],
      [seasonId, teamId],
    ],
    () =>
      getSquadWithPlayerById(teamId, seasonId).then(
        (response) => response.data
      ),
    {
      enabled: !!seasonId && !!teamId,
      refetchOnMount: "always",
    }
  );

  // 모든 팀 아이디
  const allTeamId =
    seasondata && seasondata[0].standings.data.map((d) => d.team_id);

  // 리그 내 모든 팀 정보
  const { isLoading: allTeamLoading, data: allTeamData } = useQuery(
    ["allTeamIdList", allTeamId],
    () =>
      Promise.all(
        allTeamId.map((d) => getTeamById(d)),
        {
          enabled: !!allTeamId,
          refetchOnMount: "always",
        }
      )
  );

  // 다가오는 경기 [localteam_id,visitorteam_id,date,time] 리스트
  const localAndVisitorTeamData =
    teamInfoData &&
    teamInfoData.upcoming.data
      .map(
        (d) =>
          d.time.status === "NS" && [
            d.localteam_id,
            d.visitorteam_id,
            d.time.starting_at.date,
            d.time.starting_at.time,
          ]
      )
      .filter((e) => e !== false);

  //바로 다음 경기 홈팀 정보
  const NextMatchContentsHome = () =>
    allTeamData &&
    localAndVisitorTeamData &&
    allTeamData.map(
      (d) =>
        d.id === localAndVisitorTeamData[0][0] && (
          <div>
            <div>
              <TeamImg src={`${d.logo_path}`} />
            </div>
            <div>{d.name}</div>
          </div>
        )
    );

  //바로 다음 경기 원정팀 정보
  const NextMatchContentsAway = () =>
    localAndVisitorTeamData &&
    allTeamData &&
    allTeamData.map(
      (d) =>
        d.id === localAndVisitorTeamData[0][1] && (
          <div>
            <div>
              <TeamImg src={`${d.logo_path}`} />
            </div>
            <div>{d.name}</div>
          </div>
        )
    );

  //바로 다음 경기 시간
  const NextMatchContentsTime = () =>
    localAndVisitorTeamData &&
    allTeamData &&
    allTeamData.map(
      (d) =>
        d.id === localAndVisitorTeamData[0][1] && (
          <div>
            <div>{localAndVisitorTeamData[0][2]}</div>
            <div>{localAndVisitorTeamData[0][3].substr(0, 5)}</div>
          </div>
        )
    );
  // 감독 정보
  const CoachContents = () =>
    teamInfoData && (
      <SquadsContents>
        <PlayerImg src={`${teamInfoData.coach.data.image_path}`} />
        <div style={{ marginLeft: "10px" }}>
          <div>{teamInfoData.coach.data.fullname}</div>
          <div>{teamInfoData.coach.data.nationality}</div>
        </div>
      </SquadsContents>
    );

  // 골키퍼 스쿼드 정보
  const GoalKeepersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 1 &&
        d.minutes > 1 && (
          <SquadsContents>
            <PlayerImg src={`${d.player.data.image_path}`} />
            <div style={{ marginLeft: "10px" }}>
              <div>
                {d.number} {d.player.data.display_name}
              </div>
              <div>{d.player.data.nationality}</div>
            </div>
          </SquadsContents>
        )
    );
  // 수비수 스쿼드 정보
  const DefendersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 2 &&
        d.minutes > 1 && (
          <SquadsContents>
            <PlayerImg src={`${d.player.data.image_path}`} />
            <div style={{ marginLeft: "10px" }}>
              <div>
                {d.number} {d.player.data.display_name}
              </div>
              <div>{d.player.data.nationality}</div>
            </div>
          </SquadsContents>
        )
    );

  // 미드필더 스쿼드 정보
  const MidfieldersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 3 &&
        d.minutes > 1 && (
          <SquadsContents>
            <PlayerImg src={`${d.player.data.image_path}`} />
            <div style={{ marginLeft: "10px" }}>
              <div>
                {d.number} {d.player.data.display_name}
              </div>
              <div>{d.player.data.nationality}</div>
            </div>
          </SquadsContents>
        )
    );

  // 공격수 스쿼드 정보
  const AttackersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 4 &&
        d.minutes > 1 && (
          <SquadsContents>
            <PlayerImg src={`${d.player.data.image_path}`} />
            <div style={{ marginLeft: "10px" }}>
              <div>
                {d.number} {d.player.data.display_name}
              </div>
              <div>{d.player.data.nationality}</div>
            </div>
          </SquadsContents>
        )
    );

  // 첫경기 ~ 마지막 경기
  const allFixture = teamInfoData && [
    ...teamInfoData.latest.data.sort(
      (a, b) => a.time.starting_at.timestamp - b.time.starting_at.timestamp
    ),
    ...teamInfoData.upcoming.data,
  ];

  //   모든 경기 [localteam_id, visitorteam_id, status, date, time, scores, winner_team_id] 리스트
  const allTeamDataInfo =
    allFixture &&
    allFixture.map((d) => [
      d.localteam_id,
      d.visitorteam_id,
      d.time.status,
      d.time.starting_at.date,
      d.time.starting_at.time,
      d.scores.ft_score,
      d.winner_team_id,
    ]);

  // =============== 경기리스트 Slider 구현 ===============//
  // 한번에 보여질 개수
  const offset = 6;

  const [index, setIndex] = useState(Math.floor(currentRound / offset) - 1);

  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving(true);
    const totalFixtures = allFixture && allFixture.length;
    const maxIndex = Math.ceil(totalFixtures / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving(true);
    const totalFixtures = allFixture && allFixture.length;
    const maxIndex = Math.ceil(totalFixtures / offset) - 1;
    const minIndex = 0;
    setIndex((prev) => (prev === minIndex ? maxIndex : prev - 1));
  };

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const rowVariants = {
    hidden: {
      x: window.outerWidth + 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 10,
    },
  };
  //======================================================//

  //===============return===============//
  return (
    <LeagueScreen>
      {teamInfoLoading || countryLoading || allTeamLoading || seasonLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <MainBanner>
          <TeamBanner>
            <div>
              <TeamImg src={`${teamInfoData.logo_path}`} />
            </div>
            <div>
              <div>{countrydata.data.name}</div>
              <div>{teamName}</div>
            </div>
          </TeamBanner>
          <NextMatch>
            <NextMatchTitle>다음 경기</NextMatchTitle>
            <NextMatchConents>
              <NextMatchContentsHome />
              <NextMatchContentsTime />
              <NextMatchContentsAway />
            </NextMatchConents>
          </NextMatch>
        </MainBanner>
      )}

      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px",
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={decreaseIndex}>
              <FontAwesomeIcon icon={faCircleArrowLeft} /> 이전
            </div>
            <div style={{ cursor: "pointer" }} onClick={increaseIndex}>
              다음 <FontAwesomeIcon icon={faCircleArrowRight} />
            </div>
          </div>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.8 }}
            key={index}
          >
            {allTeamDataInfo &&
              allTeamData &&
              allTeamDataInfo
                .slice(offset * index, offset * index + offset)
                .map((fixture) => (
                  //   모든 경기 [localteam_id, visitorteam_id, status, date, time, scores, winner_team_id] 리스트

                  <Box key={fixture}>
                    {allTeamData.map(
                      (d) =>
                        d.id === fixture[0] && (
                          <TeamImg src={`${d.logo_path}`} />
                        )
                    )}
                    {fixture[2] === "FT" ? (
                      <div>
                        <div>{fixture[3]}</div>
                        <div>{fixture[5]}</div>
                      </div>
                    ) : fixture[2] === "NS" ? (
                      <div>
                        <div>{fixture[3]}</div>
                        <div>{fixture[4].substr(0, 5)}</div>
                      </div>
                    ) : (
                      <div>
                        <div>{fixture[3]}</div>
                        <div>{fixture[2]}</div>
                      </div>
                    )}
                    {allTeamData.map(
                      (d) =>
                        d.id === fixture[1] && (
                          <TeamImg src={`${d.logo_path}`} />
                        )
                    )}
                  </Box>
                ))}
          </Row>
        </AnimatePresence>
      </Slider>
      {squadLoading || teamInfoLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <Squads>
          <SquadsTab>
            <SquadsTitle>감독</SquadsTitle>
            <SquadsContent>
              <CoachContents />
            </SquadsContent>
          </SquadsTab>
          <SquadsTab>
            <SquadsTitle>골키퍼</SquadsTitle>
            <SquadsContent>
              <GoalKeepersContents />
            </SquadsContent>
          </SquadsTab>
          <SquadsTab>
            <SquadsTitle>수비수</SquadsTitle>
            <SquadsContent>
              <DefendersContents />
            </SquadsContent>
          </SquadsTab>
          <SquadsTab>
            <SquadsTitle>미드필더</SquadsTitle>
            <SquadsContent>
              <MidfieldersContents />
            </SquadsContent>
          </SquadsTab>
          <SquadsTab>
            <SquadsTitle>공격수</SquadsTitle>
            <SquadsContent>
              <AttackersContents />
            </SquadsContent>
          </SquadsTab>
        </Squads>
      )}
    </LeagueScreen>
  );
}

export default TeamInfo;
