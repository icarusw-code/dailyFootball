import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getPlayerById,
  getTopPlayersById,
} from "../api";

const LeagueScreen = styled.div`
  width: 100%;
  height: 1200px;
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

const Players = styled.div`
  display: flex;
`;

const Ranking = styled.div`
  margin-left: 10px;
  width: 450px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PlayerImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const GoalRankingInfo = styled.div`
  display: flex;
`;

function LeaguePlayerStatistics() {
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

  const { isLoading: playerRankLoading, data: playerRankData } = useQuery(
    ["players", seasonId],
    () => getTopPlayersById(seasonId),
    {
      enabled: !!seasonId,
    }
  );

  const roundCount =
    leagueStatisticsData &&
    (leagueStatisticsData[0]?.standings.data.length - 1) * 2;

  const currentRound =
    leagueStatisticsData && leagueStatisticsData[0]?.round_name;

  const goalPlayers =
    playerRankData && playerRankData.data.goalscorers.data?.slice(0, 20);

  const assistPlayers =
    playerRankData && playerRankData.data.assistscorers.data?.slice(0, 20);

  const cardPlayers =
    playerRankData && playerRankData.data.cardscorers.data?.slice(0, 20);

  const { isLoading: playerGoalLoading, data: playerGoalData } = useQuery(
    ["players", goalPlayers],
    () =>
      Promise.all(goalPlayers.map((d) => getPlayerById(d.player_id))).then(
        (response) => response.map((response) => response.data)
      ),
    {
      enabled: !!playerRankData,
    }
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

  console.log(leagueStatisticsData[0].standings.data);
  const GoalRanking = () =>
    playerGoalData &&
    playerGoalData.map((d) =>
      goalPlayers.map(
        (g) =>
          d.player_id === g.player_id &&
          leagueStatisticsData[0].standings.data.map(
            (t) =>
              t.team_id === g.team_id && (
                <GoalRankingInfo>
                  <PlayerImg src={`${d.image_path}`} />
                  <div>
                    <div>{d.display_name}</div>
                    <div>{t.team_name}</div>
                  </div>
                  <div>
                    {g.goals}({g.penalty_goals})
                  </div>
                </GoalRankingInfo>
              )
          )
      )
    );

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
      <Players>
        <Ranking>
          <Title>득점왕</Title>
          <GoalRanking />
        </Ranking>
        <Ranking>
          <Title>도움왕</Title>
        </Ranking>
        <Ranking>
          <Title>경고</Title>
        </Ranking>
      </Players>
    </LeagueScreen>
  );
}

export default LeaguePlayerStatistics;
