import styled from "styled-components";
import { useQueries, useQuery } from "react-query";
import {
  getFixturesByDate,
  getLeagueById,
  getTeamById,
  leagueId,
  leagueIds,
} from "../../../api";
import { useEffect, useState } from "react";
import { computeHeadingLevel } from "@testing-library/react";

const HomeLeftMain = styled.div`
  width: 100%;
  height: 600px;
  background-color: skyblue;
`;

const Loading = styled.div`
  font-size: 30px;
`;

const FixutreList = styled.div`
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
  // const fixtures = useQuery("fixtures", getFixturesByDate).data;
  // console.log(fixtures?.data);
  // const visitorTeamId = fixtures?.data[0].visitorteam_id;
  // console.log(visitorTeamId);
  // // const visitorTeam = useQuery("visitorTeam", getTeamById);
  // // console.log(visitorTeam);

  const { isLoading: leagueLoading, data: leaguedata } = useQuery(
    ["leaguIdList", leagueId],
    () => Promise.all(leagueId.map((id) => getLeagueById(id)))
  );

  const ListAll = () =>
    leaguedata &&
    leaguedata.map((d) => (
      <FixutreList>
        <LeagueList key={d.data.id}>
          <League>
            <Img src={`${d.data.logo_path}`} />
            {d.data.name}
          </League>
          <Fixutre>바르셀로나 4: 0 레알마드리드</Fixutre>
        </LeagueList>
      </FixutreList>
    ));

  return (
    <HomeLeftMain>
      <DateBar>TODAY!</DateBar>
      {leagueLoading ? <Loading>Loading....</Loading> : <ListAll />}
    </HomeLeftMain>
  );
}

export default HomeLeft;
