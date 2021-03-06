import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getCountryById,
  getLeagueStatisticsById,
  getTeamStatById,
} from "../api";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";

const LeagueScreen = styled.div`
  width: 100%;
  height: 3000px;
  color: white;
  background-color: #272a36;
`;

const Loading = styled.div`
  font-size: 30px;
`;

const MainBanner = styled.div`
  display: flex;
  font-size: 30px;
`;

const LeagueImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const LeagueName = styled.div``;

const Navbar = styled.div`
  display: flex;
`;

const NavbarItem = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StatisticsNavbar = styled.div`
  display: flex;
`;

const StatisticsNavbarItem = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const MainInfo = styled.div``;

const MainInfoItem = styled.div`
  margin-right: 30px;
`;

const Title = styled.div`
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
`;
const Contents = styled.div`
  display: flex;
  margin-left: 5px;
`;

const ContentsInfo = styled.div`
  margin-right: 10px;
`;

const TeamImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

function LeagueTeamStatistics() {
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

  const roundCount =
    leagueStatisticsData &&
    (leagueStatisticsData[0].standings.data.length - 1) * 2;

  const currentRound =
    leagueStatisticsData && leagueStatisticsData[0].round_name;

  const { isLoading: teamStatsLoading, data: teamStatsData } = useQuery(
    ["teamStats", { allTeamId, seasonId }],
    () =>
      Promise.all(allTeamId.map((d) => getTeamStatById(d, seasonId))).then(
        (response) => response.map((i) => i.data)
      ),
    {
      enabled: !!seasonId && !!allTeamId,
      refetchOnMount: "always",
    }
  );

  const avgGoalsPerGameScored =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_goals_per_game_scored.total, d.name])
      .sort((a, b) => b[0] - a[0]);

  console.log(teamStatsData);
  const AvgGoalsPerGameScoredContents = () =>
    avgGoalsPerGameScored &&
    teamStatsData &&
    avgGoalsPerGameScored.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgFirstGoals =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_first_goal_scored.total, d.name])
      .sort();

  const AvgFirstGoalsContents = () =>
    avgFirstGoals &&
    teamStatsData &&
    avgFirstGoals.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgShotOnTarget =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_shots_on_target_per_game, d.name])
      .sort((a, b) => b[0] - a[0]);

  const AvgShotOnTargetContents = () =>
    avgShotOnTarget &&
    teamStatsData &&
    avgShotOnTarget.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgBallPossession =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_ball_possession_percentage, d.name])
      .sort((a, b) => b[0] - a[0]);

  const AvgBallPossessionContents = () =>
    avgBallPossession &&
    teamStatsData &&
    avgBallPossession.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}%</ContentsInfo>
            </Contents>
          )
      )
    );

  const dangerousAttacks =
    teamStatsData &&
    teamStatsData
      .map((d) => [
        Math.round(
          (d.stats.data[0].dangerous_attacks /
            (d.stats.data[0].win.total +
              d.stats.data[0].draw.total +
              d.stats.data[0].lost.total)) *
            10
        ) / 10,
        d.name,
      ])
      .sort((a, b) => b[0] - a[0]);

  const DangerousAttacksContents = () =>
    dangerousAttacks &&
    teamStatsData &&
    dangerousAttacks.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgShotOffTarget =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_shots_off_target_per_game, d.name])
      .sort((a, b) => b[0] - a[0]);

  const AvgShotOffTargetContents = () =>
    avgShotOffTarget &&
    teamStatsData &&
    avgShotOffTarget.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgGoalsPerGameConceded =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_goals_per_game_conceded.total, d.name])
      .sort();

  const AvgGoalsPerGameConcededContents = () =>
    avgGoalsPerGameConceded &&
    teamStatsData &&
    avgGoalsPerGameConceded.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgFirstConceded =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_first_goal_conceded.total, d.name])
      .sort();

  const AvgFirstConcededContents = () =>
    avgFirstConceded &&
    teamStatsData &&
    avgFirstConceded.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgFouls =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_fouls_per_game, d.name])
      .sort((a, b) => b[0] - a[0]);

  const AvgFoulsContents = () =>
    avgFouls &&
    teamStatsData &&
    avgFouls.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const offsides =
    teamStatsData &&
    teamStatsData
      .map((d) => [
        Math.round(
          (d.stats.data[0].offsides /
            (d.stats.data[0].win.total +
              d.stats.data[0].draw.total +
              d.stats.data[0].lost.total)) *
            100
        ) / 100,
        d.name,
      ])
      .sort((a, b) => b[0] - a[0]);

  const OffsidesContents = () =>
    offsides &&
    teamStatsData &&
    offsides.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const cleanSheet =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].clean_sheet.total, d.name])
      .sort((a, b) => b[0] - a[0]);

  const CleanSheetContents = () =>
    cleanSheet &&
    teamStatsData &&
    cleanSheet.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
    );

  const avgCorners =
    teamStatsData &&
    teamStatsData
      .map((d) => [d.stats.data[0].avg_corners, d.name])
      .sort((a, b) => b[0] - a[0]);

  const AvgCornersContents = () =>
    avgCorners &&
    teamStatsData &&
    avgCorners.map((t, index) =>
      teamStatsData.map(
        (d) =>
          d.name === t[1] && (
            <Contents
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToTeam(
                  leagueId,
                  seasonId,
                  countryId,
                  d.id,
                  d.name,
                  currentRound
                );
              }}
            >
              <ContentsInfo>{index + 1}.</ContentsInfo>
              <TeamImg src={`${d.logo_path}`} />
              <ContentsInfo>{d.name}</ContentsInfo>
              <ContentsInfo>{t[0]}</ContentsInfo>
            </Contents>
          )
      )
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
    countryId,
    allTeamId
  ) => {
    navigate(`/${leagueName}`, {
      state: {
        leagueId: leagueId,
        seasonId: seasonId,
        leagueLogo: leagueLogo,
        countryId: countryId,
        allTeamId: allTeamId,
      },
    });
  };

  const goToTeams = (
    leagueName,
    leagueId,
    seasonId,
    leagueLogo,
    countryId,
    allTeamId
  ) => {
    navigate(`/${leagueName}/teams`, {
      state: {
        leagueId: leagueId,
        seasonId: seasonId,
        leagueLogo: leagueLogo,
        countryId: countryId,
        allTeamId: allTeamId,
      },
    });
  };

  const goToTeam = (
    leagueId,
    seasonId,
    countryId,
    teamId,
    teamName,
    currentRound
  ) => {
    navigate(`/teams/${teamName}`, {
      state: {
        leagueId: leagueId,
        seasonId: seasonId,
        countryId: countryId,
        teamId: teamId,
        teamName: teamName,
        currentRound: currentRound,
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
              <div>{currentRound} ?????????</div>
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
            goToOverview(
              leagueName,
              leagueId,
              seasonId,
              leagueLogo,
              countryId,
              allTeamId
            )
          }
        >
          ????????????
        </NavbarItem>
        <NavbarItem
          key={leagueId}
          onClick={() =>
            goToPlayers(leagueName, leagueId, seasonId, leagueLogo, countryId)
          }
        >
          ??????
        </NavbarItem>
      </Navbar>
      <StatisticsNavbar>
        <StatisticsNavbarItem
          key={leagueId}
          onClick={() =>
            goToPlayers(leagueName, leagueId, seasonId, leagueLogo, countryId)
          }
        >
          ??????
        </StatisticsNavbarItem>
        <StatisticsNavbarItem
          key={leagueId}
          onClick={() =>
            goToTeams(
              leagueName,
              leagueId,
              seasonId,
              leagueLogo,
              countryId,
              allTeamId
            )
          }
        >
          ???
        </StatisticsNavbarItem>
      </StatisticsNavbar>
      {teamStatsLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <MainInfo>
          <Container>
            <Row>
              <Col sm={4}>
                <Title>????????? ?????? ??????</Title>
                <AvgGoalsPerGameScoredContents />
              </Col>
              <Col sm={4}>
                <Title>??? ?????? ?????? ??????</Title>
                <AvgFirstGoalsContents />
              </Col>
              <Col sm={4}>
                <Title>????????? ?????? ??????</Title>
                <AvgShotOnTargetContents />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Title>?????? ?????????</Title>
                <AvgBallPossessionContents />
              </Col>
              <Col sm={4}>
                <Title>????????? ???????????? ??????</Title>
                <DangerousAttacksContents />
              </Col>
              <Col sm={4}>
                <Title>????????? ????????? ??????</Title>
                <AvgShotOffTargetContents />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Title>????????? ?????? ??????</Title>
                <AvgGoalsPerGameConcededContents />
              </Col>
              <Col sm={4}>
                <Title>??? ?????? ?????? ??????</Title>
                <AvgFirstConcededContents />
              </Col>
              <Col sm={4}>
                <Title>????????? ??????</Title>
                <AvgFoulsContents />
              </Col>
            </Row>
            <Row>
              <Col>
                <Title>????????? ?????? ???????????????</Title>
                <OffsidesContents />
              </Col>
              <Col>
                <Title>????????? ??????</Title>
                <CleanSheetContents />
              </Col>
              <Col>
                <Title>????????? ?????? ?????????</Title>
                <AvgCornersContents />
              </Col>
            </Row>
          </Container>
        </MainInfo>
      )}
    </LeagueScreen>
  );
}

export default LeagueTeamStatistics;
