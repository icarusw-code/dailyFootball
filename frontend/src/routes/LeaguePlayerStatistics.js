import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getTopPlayersById } from "../api";

function LeaguePlayerStatistics() {
  const { leagueName } = useParams();
  const {
    state: { seasonId },
  } = useLocation();

  const { isLoading: playerLoading, data: playerData } = useQuery(
    ["seasonId", seasonId],
    () => getTopPlayersById(seasonId)
  );

  // const goalPlayers =
  //   playerData && playerData.data.goalscorers.data?.slice(0, 20);

  // const assistPlayers =
  //   playerData && playerData.data.assistscorers.data?.slice(0, 20);

  // const cardPlayers =
  //   playerData && playerData.data.cardscorers.data?.slice(0, 20);

  // console.log("골", goalPlayers);
  // console.log("어시", assistPlayers);
  // console.log("카드", cardPlayers);

  return <h1>리그 통계</h1>;
}

export default LeaguePlayerStatistics;
