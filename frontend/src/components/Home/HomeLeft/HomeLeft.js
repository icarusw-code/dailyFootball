import styled from "styled-components";
import { Calendar } from "react-calendar";
// import formatDate from "dateFormatter.js";
import "react-calendar/dist/Calendar.css";
import { useQueries, useQuery } from "react-query";
import {
  getFixturesByDate,
  getLeagueById,
  getTeamById,
  leagueId,
} from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeLeftMain = styled.div`
  width: 100%;
  height: 600px;
  background-color: skyblue;
`;

const Loading = styled.div`
  font-size: 30px;
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

const Scores = styled.div`
  width: 100px;
`;

const Test = styled.div`
  display: flex;
`;

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
    }
  );

  useEffect(() => {
    dateRefetch();
  }, [dateRefetch, date]);

  const Fresult = fixturedata?.map((f) => f.data).flat();
  const Lresult = leaguedata?.map((d) => d.data);

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

  const ListAll = () =>
    leaguedata &&
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
          <Test>
            <div>
              {Fresult.map(
                (f) =>
                  d.data.id === f.league_id &&
                  localTeamData.map(
                    (ltd) =>
                      ltd.id === f.localteam_id && (
                        <Fixutre>
                          {ltd.name}
                          <Img src={`${ltd.logo_path}`} />
                        </Fixutre>
                      )
                  )
              )}
            </div>
            <Scores>
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
                            ) : (
                              <div>{f.time.status} </div>
                            )}
                          </div>
                        </Fixutre>
                      )
                  )
              )}
            </Scores>
            <div>
              {Fresult.map(
                (f) =>
                  d.data.id === f.league_id &&
                  visitorTeamData.map(
                    (vtd) =>
                      vtd.id === f.visitorteam_id && (
                        <Fixutre>
                          <Img src={`${vtd.logo_path}`} />
                          {vtd.name}
                        </Fixutre>
                      )
                  )
              )}
            </div>
          </Test>
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
      visitorTeamLoading ? (
        <Loading>Loading....</Loading>
      ) : (
        <ListAll />
      )}
    </HomeLeftMain>
  );
}

export default HomeLeft;
