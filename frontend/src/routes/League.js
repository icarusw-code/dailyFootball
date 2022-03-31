import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getSeasonsById,
  getTeamById,
} from "../api";
import { useEffect, useState } from "react";

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

const SeasonBar = styled.div`
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

const TableButton = styled.div`
  margin: 5px 10px;
`;

const LeagueName = styled.div``;

const TeamBar = styled.div`
  display: flex;
`;

const InfoBar = styled.div`
  display: flex;
`;

const TeamInfo = styled.div`
  display: flex;
`;

const Ranking = styled.div`
  margin-left: 10px;
  margin-right: 20px;
  text-align: center;
`;

const TeamName = styled.div`
  margin-right: 10px;
`;

const Navbar = styled.div`
  display: flex;
`;

const NavbarItem = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

function League() {
  const { leagueName } = useParams();
  const {
    state: { leagueId, seasonId, leagueLogo, countryId },
  } = useLocation();

  const { isLoading: countryLoading, data: countrydata } = useQuery(
    ["countryId", countryId],
    () => getCountryById(countryId),
    {
      enabled: !!countryId,
    }
  );

  const { isLoading: leagueStatisticsLoading, data: leagueStatisticsData } =
    useQuery(
      ["seasonId", seasonId],
      () => getLeagueStatisticsById(seasonId).then((response) => response.data),
      {
        enabled: !!seasonId,
      }
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

  const [index, setIndex] = useState("All");

  const roundCount =
    leagueStatisticsData &&
    (leagueStatisticsData[0]?.standings.data.length - 1) * 2;

  const currentRound =
    leagueStatisticsData && leagueStatisticsData[0]?.round_name;

  console.log(leagueStatisticsData[0].standings.data);
  const homeData =
    leagueStatisticsData &&
    leagueStatisticsData[0].standings.data
      .map((d) => [d.home.points, d.team_id, d.logo_path])
      .sort((a, b) => b[0] - a[0]);

  // console.log(homeData);
  const LeagueStatistics = () =>
    leagueStatisticsData &&
    teamData &&
    leagueStatisticsData[0].standings.data.map(
      (d, idx) =>
        index === "All" ? (
          teamData.map(
            (t) =>
              d.team_id === t.id && (
                <TeamBar>
                  <Ranking>{d.position}</Ranking>
                  <TeamInfo>
                    <TeamName>
                      <TeamImg src={`${t.logo_path}`} /> {d.team_name}
                    </TeamName>
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
                  </TeamInfo>
                </TeamBar>
              )
          )
        ) : index === "Home" ? (
          homeData.map(
            (home) =>
              home[1] === d.team_id && (
                <TeamBar>
                  <Ranking>{idx + 1}</Ranking>
                  <TeamInfo>
                    <TeamName>
                      {/* <TeamImg src={`${t.logo_path}`} /> {d.team_name} */}
                    </TeamName>
                    <div>{d.home.games_palyed}</div>
                    <div>{d.home.won}</div>
                    <div>{d.home.draw}</div>
                    <div>{d.home.lost}</div>
                    <div>
                      {d.home.goals_scored} - {d.home.goals_against}
                    </div>
                    <div>{d.total.goal_difference}</div>
                    <div>{d.home.points}</div>
                    <div>{d.recent_form}</div>
                  </TeamInfo>
                </TeamBar>
              )
          )
        ) : (
          <span>hello</span>
        )

      //       <TeamBar>
      //         <Ranking>{d.position}</Ranking>
      //         <TeamInfo>
      //           <TeamName>
      //             <TeamImg src={`${t.logo_path}`} /> {d.team_name}
      //           </TeamName>
      //           <div>{d.away.games_palyed}</div>
      //           <div>{d.away.won}</div>
      //           <div>{d.away.draw}</div>
      //           <div>{d.away.lost}</div>
      //           <div>
      //             {d.away.goals_scored} - {d.away.goals_against}
      //           </div>
      //           <div>{d.total.goal_difference}</div>
      //           <div>{d.away.points}</div>
      //           <div>{d.recent_form}</div>
      //         </TeamInfo>
      //       </TeamBar>
      //     ))
      // )
    );

  const navigate = useNavigate();

  const goToPlayers = (
    leagueName,
    leagueId,
    seasonId,
    leagueLogo,
    countryId
  ) => {
    navigate(`/${leagueName}/players`, {
      state: {
        leagueId: leagueId,
        seasonId: seasonId,
        leagueLogo: leagueLogo,
        countryId: countryId,
      },
    });
  };

  const goToOverview = (
    leagueName,
    leagueId,
    seasonId,
    leagueLogo,
    countryId
  ) => {
    navigate(`/${leagueName}`, {
      state: {
        leagueId: leagueId,
        seasonId: seasonId,
        leagueLogo: leagueLogo,
        countryId: countryId,
      },
    });
  };

  return (
    <LeagueScreen>
      {countryLoading || leagueStatisticsLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        leagueStatisticsData && (
          <MainBanner>
            <LeagueImg src={`${leagueLogo}`} />
            <LeagueName>
              <div>{countrydata.data.name}</div>
              <div>{leagueName}</div>
              <div>{currentRound} 라운드</div>
              <div>
                진행도: {Math.round((currentRound / roundCount) * 100)}%
              </div>
            </LeagueName>
          </MainBanner>
        )
      )}
      <Navbar>
        <NavbarItem
          onClick={() =>
            goToOverview(leagueName, leagueId, seasonId, leagueLogo, countryId)
          }
        >
          전체보기
        </NavbarItem>
        <NavbarItem
          key={leagueId}
          onClick={() =>
            goToPlayers(leagueName, leagueId, seasonId, leagueLogo, countryId)
          }
        >
          통계
        </NavbarItem>
      </Navbar>
      {leagueStatisticsLoading || TeamLoading || seasonLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <LeftScreen>
          <TableButton>
            <button onClick={() => setIndex("All")}>All</button>
            <button onClick={() => setIndex("Home")}>Home</button>
            <button onClick={() => setIndex("Away")}>Away</button>
          </TableButton>
          <SeasonBar>
            {leagueName}
            {seasonData.name}
          </SeasonBar>
          <InfoBar>
            <Ranking>순위</Ranking>
            <TeamName>팀</TeamName>
          </InfoBar>
          <LeagueStatistics />
        </LeftScreen>
      )}
    </LeagueScreen>
  );
}

export default League;
