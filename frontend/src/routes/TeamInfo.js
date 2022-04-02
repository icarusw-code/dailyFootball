import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getSquadWithPlayerById,
  getTeamById,
  getTeamInfoById,
} from "../api";
import { Spinner } from "react-bootstrap";

const LeagueScreen = styled.div`
  width: 100%;
  height: 3000px;
  color: white;
  background-color: #272a36;
`;

const MainBanner = styled.div`
  display: flex;
  font-size: 30px;
`;

const TeamBanner = styled.div`
  display: flex;
`;

const NextMatch = styled.div`
  font-size: 20px;
  margin-left: 400px;
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

  //   squadsdata &&
  //     console.log(squadsdata.map((d) => d.minutes > 1 && d.player.data.fullname));

  // 골키퍼 스쿼드 정보
  const GoalKeepersContents = () =>
    squadsdata &&
    squadsdata.map(
      (d) =>
        d.player.data.position_id === 1 &&
        d.minutes > 1 && (
          <SquadsContents>
            <PlayerImg src={`${d.player.data.image_path}`} />
            <div>
              <div>
                {d.number} {d.player.data.fullname}
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
            <div>
              <div>
                {d.number} {d.player.data.fullname}
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
            <div>
              <div>
                {d.number} {d.player.data.fullname}
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
            <div>
              <div>
                {d.number} {d.player.data.fullname}
              </div>
              <div>{d.player.data.nationality}</div>
            </div>
          </SquadsContents>
        )
    );

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
      {squadLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <Squads>
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
