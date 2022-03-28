import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getCountryById, getLeagueStatisticsById, getTeamById } from "../api";
import { useEffect } from "react";

const LeagueScreen = styled.div`
  width: 100%;
  height: 1200px;
  color: white;
  background-color: #272a36;
`;

const Loading = styled.div`
  font-size: 30px;
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
  font-size: 20px;
`;

const LeagueName = styled.div``;

const TeamBar = styled.div`
  display: flex;
`;

const TeamName = styled.div`
  display: flex;
`;

function League() {
  const { leagueName } = useParams();
  const {
    state: { leagueId, sessionId, leagueLogo, countryId },
  } = useLocation();

  const { isLoading: countryLoading, data: countrydata } = useQuery(
    ["countryId", countryId],
    () => getCountryById(countryId)
  );

  const { isLoading: leagueStatisticsLoading, data: leagueStatisticsData } =
    useQuery(["sessionId", sessionId], () =>
      getLeagueStatisticsById(sessionId).then((response) => response.data)
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
      {leagueStatisticsLoading || TeamLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <LeagueStatistics />
      )}
    </LeagueScreen>
  );
}

export default League;
