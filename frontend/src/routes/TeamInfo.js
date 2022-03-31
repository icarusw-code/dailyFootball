import { useLocation } from "react-router-dom";

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

  return <h1>{teamName}</h1>;
}

export default TeamInfo;
