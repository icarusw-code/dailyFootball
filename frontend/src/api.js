const API_TOKEN =
  "NMbZwhYiIGRJ2zHZklgNFSRy8rIL0PzHR6ooj2PPNNW7CLs3S0KbJjiqkIOU";
const BASE_PATH = "https://soccer.sportmonks.com/api/v2.0";

// EPL, LaLiga, Bun, Ser, Leg
export const leagueId = [8, 564, 82, 384, 301];

export function getFixturesByDate(leagueId, Date) {
  return fetch(
    `${BASE_PATH}/fixtures/date/${Date}?api_token=${API_TOKEN}&leagues=${leagueId}`
  ).then((response) => response.json());
}

export function getTeamById(teamId) {
  return fetch(`${BASE_PATH}/teams/${teamId}?api_token=${API_TOKEN}`)
    .then((response) => response.json())
    .then((Object) => Object.data);
}

export function getLeagueById(leagueId) {
  return fetch(`${BASE_PATH}/leagues/${leagueId}?api_token=${API_TOKEN}`).then(
    (response) => response.json()
  );
}
