import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCountryById,
  getLeagueStatisticsById,
  getPlayerById,
  getTeamById,
  getTopPlayersById,
} from "../api";
import Yellow_card from "../img/Yellow_card.png";
import Red_card from "../img/Red_card.png";
import { ProgressBar, Spinner } from "react-bootstrap";

const LeagueScreen = styled.div`
  width: 100%;
  height: 1200px;
  color: white;
  background-color: #272a36;
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
  margin-right: 30px;
  width: 600px;
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

const TeamImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CardImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: 20px;
`;

const RankingInfo = styled.div`
  display: flex;
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
    () => getTopPlayersById(seasonId).then((respnse) => respnse.data),
    {
      enabled: !!seasonId,
      refetchOnMount: "always",
    }
  );

  const allTeamId =
    leagueStatisticsData &&
    leagueStatisticsData[0].standings.data.map((d) => d.team_id);

  const { isLoading: allTeamLoading, data: allTeamData } = useQuery(
    ["allTeamId", allTeamId],
    () => Promise.all(allTeamId.map((d) => getTeamById(d))),
    {
      enabled: !!allTeamId,
      refetchOnMount: "always",
    }
  );

  const roundCount =
    leagueStatisticsData &&
    (leagueStatisticsData[0].standings.data.length - 1) * 2;

  const currentRound =
    leagueStatisticsData && leagueStatisticsData[0].round_name;

  const goalPlayers =
    playerRankData && playerRankData.goalscorers.data.slice(0, 20);

  const assistPlayers =
    playerRankData && playerRankData.assistscorers.data.slice(0, 20);

  const cardPlayers =
    playerRankData && playerRankData.cardscorers.data.slice(0, 20);

  const { isLoading: playerGoalLoading, data: playerGoalData } = useQuery(
    ["goalPlayers", goalPlayers],
    () =>
      Promise.all(goalPlayers.map((d) => getPlayerById(d.player_id))).then(
        (response) => response.map((d) => d.data)
      ),
    {
      enabled: !!goalPlayers,
    }
  );

  const { isLoading: playerAssistLoading, data: playerAssistData } = useQuery(
    ["assistPlayers", assistPlayers],
    () =>
      Promise.all(assistPlayers.map((d) => getPlayerById(d.player_id))).then(
        (response) => response.map((d) => d.data)
      ),
    {
      enabled: !!assistPlayers,
    }
  );

  const { isLoading: playercardLoading, data: playerCardData } = useQuery(
    ["cardPlayers", cardPlayers],
    () =>
      Promise.all(cardPlayers.map((d) => getPlayerById(d.player_id))).then(
        (response) => response.map((d) => d.data)
      ),
    {
      enabled: !!cardPlayers,
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

  const GoalRanking = () =>
    playerGoalData &&
    goalPlayers &&
    allTeamData &&
    playerGoalData.map((d) =>
      goalPlayers.map((g) =>
        allTeamData.map(
          (t) =>
            t.id === g.team_id &&
            d.player_id === g.player_id && (
              <RankingInfo>
                <PlayerImg src={`${d.image_path}`} />
                <div>
                  <div>{d.display_name}</div>
                  <div>
                    <TeamImg src={`${t.logo_path}`} />
                    {t.name}
                  </div>
                </div>
                <div>
                  {g.goals}({g.penalty_goals})
                </div>
              </RankingInfo>
            )
        )
      )
    );

  const AssistRanking = () =>
    playerAssistData &&
    assistPlayers &&
    allTeamData &&
    playerAssistData.map((d) =>
      assistPlayers.map((g) =>
        allTeamData.map(
          (t) =>
            t.id === g.team_id &&
            d.player_id === g.player_id && (
              <RankingInfo>
                <PlayerImg src={`${d.image_path}`} />
                <div>
                  <div>{d.display_name}</div>
                  <div>
                    <TeamImg src={`${t.logo_path}`} />
                    {t.name}
                  </div>
                </div>
                <div>{g.assists}</div>
              </RankingInfo>
            )
        )
      )
    );

  const CardRanking = () =>
    playerCardData &&
    cardPlayers &&
    allTeamData &&
    playerCardData.map((d) =>
      cardPlayers.map((g) =>
        allTeamData.map(
          (t) =>
            t.id === g.team_id &&
            d.player_id === g.player_id && (
              <RankingInfo>
                <PlayerImg src={`${d.image_path}`} />
                <div>
                  <div>{d.display_name}</div>
                  <div>
                    <TeamImg src={`${t.logo_path}`} />
                    {t.name}
                  </div>
                </div>
                <div>
                  <div>
                    <CardImg src={Yellow_card} /> {g.yellowcards}
                  </div>
                  <div>
                    <CardImg src={Red_card} /> {g.redcards}
                  </div>
                </div>
              </RankingInfo>
            )
        )
      )
    );

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
      <StatisticsNavbar>
        <StatisticsNavbarItem
          key={leagueId}
          onClick={() =>
            goToPlayers(leagueName, leagueId, seasonId, leagueLogo, countryId)
          }
        >
          선수
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
          팀
        </StatisticsNavbarItem>
      </StatisticsNavbar>
      {playerGoalLoading ||
      playerAssistLoading ||
      playercardLoading ||
      playerRankLoading ||
      allTeamLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <Players>
          <Ranking>
            <Title>득점순위</Title>
            <GoalRanking />
          </Ranking>
          <Ranking>
            <Title>도움순위</Title>
            <AssistRanking />
          </Ranking>
          <Ranking>
            <Title>경고</Title>
            <CardRanking />
          </Ranking>
        </Players>
      )}
    </LeagueScreen>
  );
}

export default LeaguePlayerStatistics;
