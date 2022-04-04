import styled from "styled-components";
import { Calendar } from "react-calendar";
// import formatDate from "dateFormatter.js";
import "react-calendar/dist/Calendar.css";
import { useQueries, useQuery } from "react-query";
import {
  getFixturesByDate,
  getLeagueById,
  getLeagueStatisticsById,
  getTeamById,
  leagueId,
} from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const HomeLeftMain = styled.div`
  width: 100%;
  height: 600px;
  background-color: skyblue;
`;

const FixutresList = styled.div`
  background-color: #252525;
`;

const LeagueList = styled.div``;

const League = styled.ul`
  background-color: #323232;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Fixutre = styled.li`
  list-style: none;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 15px;
`;

const DateBar = styled.div``;

const FixtureScores = styled.div`
  width: 100px;
`;

const FixtureBox = styled.div`
  display: flex;
`;

const FixtureTeam = styled.div``;

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

function HomeLeft() {
  const [date, setDate] = useState(new Date());

  const customDate = formatDate(date);

  const { isLoading: leagueLoading, data: leaguedata } = useQuery(
    ["leaguIdList", leagueId],
    () => Promise.all(leagueId.map((id) => getLeagueById(id)))
  );

  const {
    isLoading: fixturesLoading,
    data: fixturedata,
    refetch: dateRefetch,
  } = useQuery(
    ["fixtures", leagueId],
    () => Promise.all(leagueId.map((id) => getFixturesByDate(id, customDate))),
    {
      enabled: !!leagueId,
      refetchInterval: 1000 * 60, // 1분마다 불러오기
    }
  );

  useEffect(() => {
    dateRefetch();
  }, [dateRefetch, date]);

  const Fresult = fixturedata?.map((f) => f.data).flat();
  const Lresult = leaguedata?.map((d) => d.data);

  const seasonList = Lresult && Lresult.map((d) => d.current_season_id);

  const { isLoading: localTeamLoading, data: localTeamData } = useQuery(
    ["loaclTeam", Fresult],
    () => Promise.all(Fresult.map((f) => getTeamById(f.localteam_id))),
    {
      enabled: !!Fresult,
      refetchOnMount: "always",
    }
  );

  const { isLoading: visitorTeamLoading, data: visitorTeamData } = useQuery(
    ["visitorTeam", Fresult],
    () => Promise.all(Fresult.map((f) => getTeamById(f.visitorteam_id))),
    {
      enabled: !!Fresult,
      refetchOnMount: "always",
    }
  );

  const { isLoading: leagueStatisticsLoading, data: leagueStatisticsData } =
    useQuery(
      ["seasonId", seasonList],
      () =>
        Promise.all(
          seasonList.map((d) =>
            getLeagueStatisticsById(d).then((response) => response.data)
          )
        ),
      {
        enabled: !!seasonList,
      }
    );

  // console.log(leagueStatisticsData.map((d) => d[0]));
  const roundList =
    leagueStatisticsData && leagueStatisticsData.map((d) => d[0]);

  const navigate = useNavigate();
  const goToLeague = (
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

  const ListAll = () =>
    leaguedata &&
    Fresult &&
    localTeamData &&
    visitorTeamData &&
    roundList &&
    leaguedata.map((d) => (
      <FixutresList>
        <LeagueList>
          <League
            key={d.data.id}
            onClick={() =>
              goToLeague(
                d.data.name,
                d.data.id,
                d.data.current_season_id,
                d.data.logo_path,
                d.data.country_id
              )
            }
          >
            <Img src={`${d.data.logo_path}`} />
            {d.data.name}
          </League>
          <FixtureBox>
            <FixtureTeam>
              {Fresult.map(
                (f) =>
                  d.data.id === f.league_id &&
                  localTeamData.map(
                    (ltd) =>
                      ltd.id === f.localteam_id &&
                      roundList.map(
                        (r) =>
                          f.league_id === r.league_id && (
                            <Fixutre
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                goToTeam(
                                  f.league_id,
                                  f.season_id,
                                  ltd.country_id,
                                  ltd.id,
                                  ltd.name,
                                  r.round_name
                                );
                              }}
                            >
                              {ltd.name}
                              <Img src={`${ltd.logo_path}`} />
                            </Fixutre>
                          )
                      )
                  )
              )}
            </FixtureTeam>
            <FixtureScores>
              {Fresult.map(
                (f) =>
                  d.data.id === f.league_id &&
                  localTeamData.map(
                    (ltd) =>
                      ltd.id === f.localteam_id && (
                        <Fixutre>
                          <div>
                            {f.scores.localteam_score}-
                            {f.scores.visitorteam_score}
                          </div>
                          <div>
                            {f.time.status === "NS" ? (
                              <div>{f.time.starting_at.time.substr(0, 5)}</div>
                            ) : f.time.status === "FT" ||
                              f.time.status === "POSTP" ? (
                              <div>{f.time.status}</div>
                            ) : (
                              <div style={{ color: "#44bd32" }}>
                                {f.time.minute}'
                              </div>
                            )}
                          </div>
                        </Fixutre>
                      )
                  )
              )}
            </FixtureScores>
            <FixtureTeam>
              {Fresult.map(
                (f) =>
                  d.data.id === f.league_id &&
                  visitorTeamData.map(
                    (vtd) =>
                      vtd.id === f.visitorteam_id &&
                      roundList.map(
                        (r) =>
                          f.league_id === r.league_id && (
                            <Fixutre
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                goToTeam(
                                  f.league_id,
                                  f.season_id,
                                  vtd.country_id,
                                  vtd.id,
                                  vtd.name,
                                  r.round_name
                                );
                              }}
                            >
                              <Img src={`${vtd.logo_path}`} />
                              {vtd.name}
                            </Fixutre>
                          )
                      )
                  )
              )}
            </FixtureTeam>
          </FixtureBox>
        </LeagueList>
      </FixutresList>
    ));

  return (
    <HomeLeftMain>
      <DateBar>TODAY!</DateBar>
      <Calendar onChange={setDate} value={date} />
      {leagueLoading ||
      fixturesLoading ||
      localTeamLoading ||
      visitorTeamLoading ||
      leagueStatisticsLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <ListAll />
      )}
    </HomeLeftMain>
  );
}

export default HomeLeft;
