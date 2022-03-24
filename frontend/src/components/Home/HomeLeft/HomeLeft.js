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
      retry: true,
    }
  );

  const Fresult = fixturedata?.map((f) => f.data).flat();
  const Lresult = leaguedata?.map((d) => d.data);

  const ListAll = () =>
    leaguedata &&
    leaguedata.map((d) => (
      <FixutresList>
        <LeagueList key={d.data.id}>
          <League>
            <Img src={`${d.data.logo_path}`} />
            {d.data.name}
          </League>
          {Fresult.map(
            (f) =>
              d.data.id === f.league_id && (
                <Fixutre>
                  [{f.localteam_id}] {f.scores.localteam_score}-{" "}
                  {f.scores.visitorteam_score} [{f.visitorteam_id}]
                </Fixutre>
              )
          )}
        </LeagueList>
      </FixutresList>
    ));

  return (
    <HomeLeftMain>
      <DateBar>TODAY!</DateBar>
      {leagueLoading || fixturesLoading ? (
        <Loading>Loading....</Loading>
      ) : (
        <ListAll />
      )}
    </HomeLeftMain>
  );
}

export default HomeLeft;
