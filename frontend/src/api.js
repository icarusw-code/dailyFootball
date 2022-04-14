const API_TOKEN =
  "NMbZwhYiIGRJ2zHZklgNFSRy8rIL0PzHR6ooj2PPNNW7CLs3S0KbJjiqkIOU";
const BASE_PATH = "https://soccer.sportmonks.com/api/v2.0";
const TimeZone = "tz=Asia/Seoul";

// EPL, LaLiga, Bun, Ser, Leg
export const leagueId = [8, 564, 82, 384, 301];

export function getFixturesByDate(leagueId, Date) {
  return fetch(
    `${BASE_PATH}/fixtures/date/${Date}?api_token=${API_TOKEN}&${TimeZone}&leagues=${leagueId}`
  ).then((response) => response.json());
}

export function getTeamById(teamId) {
  return fetch(
    `${BASE_PATH}/teams/${teamId}?api_token=${API_TOKEN}&${TimeZone}`
  )
    .then((response) => response.json())
    .then((Object) => Object.data);
}

export function getLeagueById(leagueId) {
  return fetch(
    `${BASE_PATH}/leagues/${leagueId}?api_token=${API_TOKEN}&${TimeZone}`
  ).then((response) => response.json());
}

export function getCountryById(countryId) {
  return fetch(
    `${BASE_PATH}/countries/${countryId}?api_token=${API_TOKEN}&${TimeZone}`
  ).then((response) => response.json());
}

export function getLeagueStatisticsById(sessionId) {
  return fetch(
    `${BASE_PATH}/standings/season/${sessionId}?api_token=${API_TOKEN}&${TimeZone}`
  ).then((response) => response.json());
}

export function getSeasonsById(seasonId) {
  return fetch(
    `${BASE_PATH}/seasons/${seasonId}?api_token=${API_TOKEN}&${TimeZone}`
  ).then((response) => response.json());
}

export function getTopPlayersById(seasonId) {
  return fetch(
    `${BASE_PATH}/topscorers/season/${seasonId}?api_token=${API_TOKEN}&${TimeZone}`
  ).then((response) => response.json());
}

export function getPlayerById(playerId) {
  return fetch(
    `${BASE_PATH}/players/${playerId}?api_token=${API_TOKEN}&include=position,team,stats,trophies,sidelined,transfers,lineups,country&${TimeZone}`
  ).then((response) => response.json());
}

export function getTeamStatById(teamId, seasonId) {
  return fetch(
    `${BASE_PATH}/teams/${teamId}?api_token=${API_TOKEN}&include=stats&seasons=${seasonId}&${TimeZone}`
  ).then((response) => response.json());
}

export function getTeamInfoById(teamId, seasonId) {
  return fetch(
    `${BASE_PATH}/teams/${teamId}?api_token=${API_TOKEN}&include=stats,upcoming,latest,coach,goalscorers,assistscorers&seasons=${seasonId}&${TimeZone}`
  )
    .then((response) => response.json())
    .then((response) => response.data);
}

export function getSquadWithPlayerById(teamId, seasonId) {
  return fetch(
    `${BASE_PATH}/squad/season/${seasonId}/team/${teamId}?api_token=${API_TOKEN}&include=player&${TimeZone}`
  ).then((response) => response.json());
}

export function getFixturesById(fixtureId) {
  return fetch(
    `${BASE_PATH}/fixtures/${fixtureId}?api_token=${API_TOKEN}&include=stats,loaclTeam,visitorTeam,lineup.player,bench&${TimeZone}`
  ).then((response) => response.json());
}

export function getFixturesDetailById(fixtureId) {
  return fetch(
    `${BASE_PATH}/fixtures/${fixtureId}?api_token=${API_TOKEN}&include=localTeam,visitorTeam, substitutions, goals, cards,  events, corners, lineup.player, bench.player, sidelined.player ,comments , highlights, round, stage, referee, venue, localCoach, visitorCoach ,group,  stats, league, stats&${TimeZone}`
  ).then((response) => response.json());
}
