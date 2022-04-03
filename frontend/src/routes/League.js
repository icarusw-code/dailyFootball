import styled from "styled-components";
import { useQuery } from "react-query";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getSeasonsById,
  getTeamById,
} from "../api";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, ProgressBar, Spinner } from "react-bootstrap";

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
  cursor: pointer;
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
    state: { leagueId, seasonId, leagueLogo, countryId, allTeamId },
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

  const homeData =
    leagueStatisticsData &&
    leagueStatisticsData[0].standings.data
      .map((d) => [d.home.points, d.team_id])
      .sort((a, b) => b[0] - a[0]);

  const awayData =
    leagueStatisticsData &&
    leagueStatisticsData[0].standings.data
      .map((d) => [d.away.points, d.team_id])
      .sort((a, b) => b[0] - a[0]);

  //===============이동===============//
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

  const goToTeam = (
    leagueName,
    leagueId,
    seasonId,
    leagueLogo,
    countryId,
    teamId,
    teamName,
    currentRound
  ) => {
    navigate(`/teams/${teamName}`, {
      state: {
        leagueName: leagueName,
        leagueId: leagueId,
        seasonId: seasonId,
        leagueLogo: leagueLogo,
        countryId: countryId,
        teamId: teamId,
        teamName: teamName,
        currentRound: currentRound,
      },
    });
  };

  const LeagueStatistics = () =>
    leagueStatisticsData && teamData && index === "All"
      ? leagueStatisticsData[0].standings.data.map((d) =>
          teamData.map(
            (t) =>
              d.team_id === t.id && (
                <tr>
                  <td>{d.position}</td>

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      goToTeam(
                        leagueName,
                        leagueId,
                        seasonId,
                        leagueLogo,
                        countryId,
                        d.team_id,
                        d.team_name,
                        currentRound
                      );
                    }}
                  >
                    <TeamImg src={`${t.logo_path}`} /> {d.team_name}
                  </td>
                  <td>{d.overall.games_played}</td>
                  <td>{d.overall.won}</td>
                  <td>{d.overall.draw}</td>
                  <td>{d.overall.lost}</td>
                  <td>
                    {d.overall.goals_scored} - {d.overall.goals_against}
                  </td>
                  <td>{d.total.goal_difference}</td>
                  <td>{d.overall.points}</td>
                  <td>{d.recent_form}</td>
                </tr>
              )
          )
        )
      : index === "Home"
      ? homeData.map((home, idx) =>
          leagueStatisticsData[0].standings.data.map((d) =>
            teamData.map(
              (t) =>
                d.team_id === home[1] &&
                d.team_id === t.id && (
                  <tr>
                    <td>{idx + 1}</td>
                    <td
                      onClick={() => {
                        goToTeam(
                          leagueName,
                          leagueId,
                          seasonId,
                          leagueLogo,
                          countryId,
                          d.team_id,
                          d.team_name
                        );
                      }}
                    >
                      <TeamImg src={`${t.logo_path}`} /> {d.team_name}
                    </td>
                    <td>{d.home.games_played}</td>
                    <td>{d.home.won}</td>
                    <td>{d.home.draw}</td>
                    <td>{d.home.lost}</td>
                    <td>
                      {d.home.goals_scored} - {d.home.goals_against}
                    </td>
                    <td>{d.total.goal_difference}</td>
                    <td>{d.home.points}</td>
                    <td>{d.recent_form}</td>
                  </tr>
                )
            )
          )
        )
      : awayData.map((away, idx) =>
          leagueStatisticsData[0].standings.data.map((d) =>
            teamData.map(
              (t) =>
                d.team_id === away[1] &&
                d.team_id === t.id && (
                  <tr>
                    <td>{idx + 1}</td>
                    <td
                      onClick={() => {
                        goToTeam(
                          leagueName,
                          leagueId,
                          seasonId,
                          leagueLogo,
                          countryId,
                          d.team_id,
                          d.team_name
                        );
                      }}
                    >
                      <TeamImg src={`${t.logo_path}`} /> {d.team_name}
                    </td>
                    <td>{d.away.games_played}</td>
                    <td>{d.away.won}</td>
                    <td>{d.away.draw}</td>
                    <td>{d.away.lost}</td>
                    <td>
                      {d.away.goals_scored} - {d.away.goals_against}
                    </td>
                    <td>{d.total.goal_difference}</td>
                    <td>{d.away.points}</td>
                    <td>{d.recent_form}</td>
                  </tr>
                )
            )
          )
        );

  //===============return===============//
  return (
    <LeagueScreen>
      {countryLoading || leagueStatisticsLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        leagueStatisticsData && (
          <MainBanner>
            <LeagueImg src={`${leagueLogo}`} />
            <LeagueName>
              <div>{countrydata.data.name}</div>
              <div>{leagueName}</div>
              <div>{currentRound} 라운드</div>
              <ProgressBar
                striped
                variant="warning"
                now={Math.round((currentRound / roundCount) * 100)}
                label={`${Math.round((currentRound / roundCount) * 100)}%`}
              />
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
        <Spinner animation="border" variant="secondary" />
      ) : (
        <LeftScreen>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => setIndex("All")}>
              All
            </Button>
            <Button variant="secondary" onClick={() => setIndex("Home")}>
              Home
            </Button>
            <Button variant="secondary" onClick={() => setIndex("Away")}>
              Away
            </Button>
          </ButtonGroup>
          <SeasonBar>
            {leagueName}
            {seasonData.name}
          </SeasonBar>
          <Table striped bordered hover variant="dark">
            <thread>
              <tr>
                <th>순위</th>
                <th>팀</th>
                <th>경기수</th>
                <th>승리</th>
                <th>무승부</th>
                <th>패배</th>
                <th>+/-</th>
                <th>골득실</th>
                <th>승점</th>
                <th>최근경기</th>
              </tr>
            </thread>
            <tbody>
              <LeagueStatistics />
            </tbody>
          </Table>
        </LeftScreen>
      )}
    </LeagueScreen>
  );
}

export default League;
