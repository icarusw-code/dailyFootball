import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
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
import Accordion from "react-bootstrap/Accordion";

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

const SquadScreen = styled.div`
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

const Best = styled.div``;

const StatisticsScreen = styled.div`
  margin-top: 40px;
`;

const PlayerStatistics = styled.div`
  display: flex;
  justify-content: space-between;
`;

function TeamInfo() {
  const {
    state: { leagueId, seasonId, countryId, teamId, teamName, currentRound },
  } = useLocation();

  // ??? ?????? ??????
  const { isLoading: teamInfoLoading, data: teamInfoData } = useQuery(
    ["teamInfo", { teamId, seasonId }],
    () => getTeamInfoById(teamId, seasonId),
    {
      enabled: !!seasonId && !!teamId,
      refetchOnMount: "always",
    }
  );

  // ?????? ??????
  const { isLoading: countryLoading, data: countrydata } = useQuery(
    ["countryId", countryId],
    () => getCountryById(countryId),
    {
      enabled: !!countryId,
      refetchOnMount: "always",
    }
  );

  // ?????? ?????? ??????
  const { isLoading: seasonLoading, data: seasondata } = useQuery(
    ["seasonId", seasonId],
    () => getLeagueStatisticsById(seasonId).then((response) => response.data),
    {
      enabled: !!seasonId,
      refetchOnMount: "always",
    }
  );

  // ??? ????????? ??????
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

  // ?????? ??? ?????????
  const allTeamId =
    seasondata && seasondata[0].standings.data.map((d) => d.team_id);

  // ?????? ??? ?????? ??? ??????
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

  // ???????????? ?????? [localteam_id,visitorteam_id,date,time] ?????????
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

  //?????? ?????? ?????? ?????? ??????
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

  //?????? ?????? ?????? ????????? ??????
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

  //?????? ?????? ?????? ??????
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

  //===============?????? ===============//
  const navigate = useNavigate();
  const goToPlayer = (
    teamId,
    teamName,
    seasonId,
    playerId,
    playerName,
    leagueId,
    countryId,
    currentRound
  ) => {
    navigate(`/player/${playerId}/${playerName}`, {
      state: {
        teamId: teamId,
        teamName: teamName,
        seasonId: seasonId,
        playerId: playerId,
        playerName: playerName,
        leagueId: leagueId,
        countryId: countryId,
        currentRound: currentRound,
      },
    });
  };

  const goToFixture = (fixtureId) => {
    navigate(`/fixture/${fixtureId}`, {
      state: {
        fixtureId: fixtureId,
      },
    });
  };

  //======================================================//
  // ?????? ??????
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

  // ????????? ????????? ??????
  const GoalKeepersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 1 &&
        d.minutes > 1 && (
          <SquadsContents
            style={{ cursor: "pointer" }}
            onClick={() => {
              goToPlayer(
                teamId,
                teamName,
                seasonId,
                d.player.data.player_id,
                d.player.data.display_name,
                leagueId,
                countryId,
                currentRound
              );
            }}
          >
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
  // ????????? ????????? ??????
  const DefendersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 2 &&
        d.minutes > 1 && (
          <SquadsContents
            style={{ cursor: "pointer" }}
            onClick={() => {
              goToPlayer(
                teamId,
                teamName,
                seasonId,
                d.player.data.player_id,
                d.player.data.display_name,
                leagueId,
                countryId,
                currentRound
              );
            }}
          >
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

  // ???????????? ????????? ??????
  const MidfieldersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 3 &&
        d.minutes > 1 && (
          <SquadsContents
            style={{ cursor: "pointer" }}
            onClick={() => {
              goToPlayer(
                teamId,
                teamName,
                seasonId,
                d.player.data.player_id,
                d.player.data.display_name,
                leagueId,
                countryId,
                currentRound
              );
            }}
          >
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

  //   console.log(squadsdata);
  // ????????? ????????? ??????
  const AttackersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 4 &&
        d.minutes > 1 && (
          <SquadsContents
            style={{ cursor: "pointer" }}
            onClick={() => {
              goToPlayer(
                teamId,
                teamName,
                seasonId,
                d.player.data.player_id,
                d.player.data.display_name,
                leagueId,
                countryId,
                currentRound
              );
            }}
          >
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

  // ????????? ~ ????????? ??????
  const allFixture = teamInfoData && [
    ...teamInfoData.latest.data.sort(
      (a, b) => a.time.starting_at.timestamp - b.time.starting_at.timestamp
    ),
    ...teamInfoData.upcoming.data,
  ];

  //   ?????? ?????? [localteam_id, visitorteam_id, status, date, time, scores, winner_team_id, fixtureId] ?????????
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
      d.id,
    ]);

  //   console.log(allTeamDataInfo);

  // =============== ??????????????? Slider ?????? ===============//
  // ????????? ????????? ??????
  const offset = 6;

  const [index, setIndex] = useState(Math.floor(currentRound / offset));

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

  //===============?????? ??????===============//
  // ???????????? //
  const PlayerGoalStatistics = () =>
    teamInfoData &&
    squadsdata &&
    teamInfoData.goalscorers.data
      .sort((a, b) => a.position - b.position)
      .map((d) =>
        squadsdata.map(
          (s) =>
            d.player_id === s.player_id && (
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  goToPlayer(
                    teamId,
                    teamName,
                    seasonId,
                    d.player_id,
                    d.display_name,
                    leagueId,
                    countryId,
                    currentRound
                  );
                }}
              >
                <PlayerImg src={`${s.player.data.image_path}`} />
                <div>{s.player.data.display_name}</div>
                <div>
                  {d.goals}({d.penalty_goals})
                </div>
              </div>
            )
        )
      );

  // ???????????? ?????? //
  const PlayerAssistStatistics = () =>
    teamInfoData &&
    squadsdata &&
    teamInfoData.assistscorers.data
      .sort((a, b) => a.position - b.position)
      .map((d) =>
        squadsdata.map(
          (s) =>
            d.player_id === s.player_id && (
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => {
                  goToPlayer(
                    teamId,
                    teamName,
                    seasonId,
                    d.player_id,
                    d.display_name,
                    leagueId,
                    countryId,
                    currentRound
                  );
                }}
              >
                <PlayerImg src={`${s.player.data.image_path}`} />
                <div>{s.player.data.display_name}</div>
                <div>{d.assists}</div>
              </div>
            )
        )
      );
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
            <NextMatchTitle>?????? ??????</NextMatchTitle>
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
              <FontAwesomeIcon icon={faCircleArrowLeft} /> ??????
            </div>
            <div style={{ cursor: "pointer" }} onClick={increaseIndex}>
              ?????? <FontAwesomeIcon icon={faCircleArrowRight} />
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
                  //   ?????? ?????? [localteam_id, visitorteam_id, status, date, time, scores, winner_team_id, fixtureId] ?????????
                  <Box
                    key={fixture}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      goToFixture(fixture[7]);
                    }}
                  >
                    {allTeamData.map(
                      (d) =>
                        d.id === fixture[0] && (
                          <TeamImg src={`${d.logo_path}`} />
                        )
                    )}
                    {fixture[2] === "FT" ? (
                      <div>
                        <div>{fixture[3]}</div>
                        {fixture[6] === teamId ? (
                          <div
                            style={{
                              width: "42px",
                              height: "32px",
                              display: "flex",
                              borderRadius: "10px",
                              backgroundColor: "#15985f",
                            }}
                          >
                            <span style={{ marginLeft: "5px" }}>
                              {fixture[5]}
                            </span>
                          </div>
                        ) : fixture[6] === null ? (
                          <div
                            style={{
                              width: "42px",
                              height: "32px",
                              display: "flex",
                              borderRadius: "10px",
                              backgroundColor: "rgb(141, 148, 153)",
                            }}
                          >
                            <span style={{ marginLeft: "5px" }}>
                              {fixture[5]}
                            </span>
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "42px",
                              height: "32px",
                              display: "flex",
                              borderRadius: "10px",
                              backgroundColor: "#e55e5b",
                            }}
                          >
                            <span style={{ marginLeft: "5px" }}>
                              {fixture[5]}
                            </span>
                          </div>
                        )}
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
        <SquadScreen>
          <Squads>
            <SquadsTab>
              <SquadsTitle>??????</SquadsTitle>
              <SquadsContent>
                <CoachContents />
              </SquadsContent>
            </SquadsTab>
            <SquadsTab>
              <SquadsTitle>?????????</SquadsTitle>
              <SquadsContent>
                <GoalKeepersContents />
              </SquadsContent>
            </SquadsTab>
            <SquadsTab>
              <SquadsTitle>?????????</SquadsTitle>
              <SquadsContent>
                <DefendersContents />
              </SquadsContent>
            </SquadsTab>
            <SquadsTab>
              <SquadsTitle>????????????</SquadsTitle>
              <SquadsContent>
                <MidfieldersContents />
              </SquadsContent>
            </SquadsTab>
            <SquadsTab>
              <SquadsTitle>?????????</SquadsTitle>
              <SquadsContent>
                <AttackersContents />
              </SquadsContent>
            </SquadsTab>
          </Squads>
          <Best>????????? ?????????</Best>
        </SquadScreen>
      )}
      {squadLoading || teamInfoLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <StatisticsScreen>
          <PlayerStatistics>
            <div>??????</div>
            <div>
              ?????? ??????
              <PlayerGoalStatistics />
            </div>
            <div>
              ???????????? ??????
              <PlayerAssistStatistics />
            </div>
          </PlayerStatistics>
        </StatisticsScreen>
      )}
    </LeagueScreen>
  );
}

export default TeamInfo;
