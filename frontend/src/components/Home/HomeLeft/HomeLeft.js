import styled from "styled-components";
import { useQueries, useQuery } from "react-query";
import {
  getFixturesByDate,
  getLeagueById,
  getTeamById,
  leagueId,
} from "../../../api";

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

function HomeLeft() {
  const { isLoading: leagueLoading, data: leaguedata } = useQuery(
    ["leaguIdList", leagueId],
    () => Promise.all(leagueId.map((id) => getLeagueById(id)))
  );

  const { isLoading: fixturesLoading, data: fixturedata } = useQuery(
    ["fixtures", leagueId],
    () => Promise.all(leagueId.map((id) => getFixturesByDate(id))),
    {
      enabled: !!leagueId,
    }
  );

  const Fresult = fixturedata?.map((f) => f.data).flat();
  const Lresult = leaguedata?.map((d) => d.data);

  const { isLoading: localTeamLoading, data: localTeamData } = useQuery(
    ["loaclTeam", Fresult],
    () => Promise.all(Fresult.map((f) => getTeamById(f.localteam_id))),
    {
      enabled: !!Fresult,
    }
  );

  const { isLoading: visitorTeamLoading, data: visitorTeamData } = useQuery(
    ["visitorTeam", Fresult],
    () => Promise.all(Fresult.map((f) => getTeamById(f.visitorteam_id))),
    {
      enabled: !!Fresult,
    }
  );

  const ListAll = () =>
    leaguedata &&
    leaguedata.map((d) => (
      <FixutresList>
        <LeagueList key={d.data.id}>
          <League>
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
                          <div>{f.time.status}</div>
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
