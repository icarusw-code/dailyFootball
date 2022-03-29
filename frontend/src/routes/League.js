import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getSeasonsById,
  getTeamById,
} from "../api";
import { useEffect } from "react";

const Loading = styled.div`
  font-size: 30px;
`;
const LeagueScreen = styled.div`
  width: 100%;
  height: 1200px;
  color: white;
  background-color: #272a36;
`;

const LeftScreen = styled.div``;

const SessonBar = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 5px;
`;

const LeagueImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const TeamImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 5px;
`;

const MainBanner = styled.div`
  display: flex;
  font-size: 30px;
`;

const LeagueName = styled.div``;

const TeamBar = styled.div`
  display: flex;
`;

const InfoBar = styled.div`
  display: flex;
`;

const TeamName = styled.div`
  display: flex;
`;

function League() {
  const { leagueName } = useParams();
  const {
    state: { leagueId, seasonId, leagueLogo, countryId },
  } = useLocation();

  const { isLoading: countryLoading, data: countrydata } = useQuery(
    ["countryId", countryId],
    () => getCountryById(countryId)
  );

  const { isLoading: leagueStatisticsLoading, data: leagueStatisticsData } =
    useQuery(["seasonId", seasonId], () =>
      getLeagueStatisticsById(seasonId).then((response) => response.data)
    );

  const { isLoading: TeamLoading, data: teamData } = useQuery(
    ["TeamId", leagueStatisticsData],
    () =>
      Promise.all(
        leagueStatisticsData[0].standings.data.map((d) =>
          getTeamById(d.team_id)
        )
      ),
    {
      enabled: !!leagueStatisticsData,
    }
  );

  const { isLoading: seasonLoading, data: seasonData } = useQuery(
    ["seasonId!", seasonId],
    () => getSeasonsById(seasonId).then((response) => response.data)
  );

  const LeagueStatistics = () =>
    leagueStatisticsData &&
    teamData &&
    leagueStatisticsData[0].standings.data.map((d) =>
      teamData.map(
        (t) =>
          d.team_id === t.id && (
            <TeamBar>
              <div>{d.position}</div>
              <TeamName>
                <TeamImg src={`${t.logo_path}`} />
                <div>{d.team_name}</div>
                <div>{d.overall.games_palyed}</div>
                <div>{d.overall.won}</div>
                <div>{d.overall.draw}</div>
                <div>{d.overall.lost}</div>
                <div>
                  {d.overall.goals_scored} - {d.overall.goals_against}
                </div>
                <div>{d.total.goal_difference}</div>
                <div>{d.overall.points}</div>
                <div>{d.recent_form}</div>
              </TeamName>
            </TeamBar>
          )
      )
    );

  return (
    <LeagueScreen>
      {countryLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <MainBanner>
          <LeagueImg src={`${leagueLogo}`} />
          <LeagueName>
            <div>{countrydata.data.name}</div>
            <div>{leagueName}</div>
          </LeagueName>
        </MainBanner>
      )}
      {leagueStatisticsLoading || TeamLoading || seasonLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <LeftScreen>
          <SessonBar>
            {leagueName}
            {seasonData.name}
          </SessonBar>
          <InfoBar>
            <div>순위</div>
            <div>팀</div>
          </InfoBar>
          <LeagueStatistics />
        </LeftScreen>
      )}
    </LeagueScreen>
  );
}

export default League;
