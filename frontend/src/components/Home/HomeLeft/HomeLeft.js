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

  // const { isLoading: leagueLoading, data: leaguedata } = useQuery(
  //   ["leagueId", leagueId]
  //   // leagueId.map((id) => () => getLeagueById(id))
  //   // leagueId.map((id) => console.log(id))
  //   // leagueId.map((id) => getLeagueById(id))
  //   // () => getLeagueById(leagueId)
  // );

  const leaguedata = useQueries([
    {
      queryKey: ["leagueId", leagueId[0]],
      queryFn: () => getLeagueById(leagueId[0]),
    },
    {
      queryKey: ["leagueId", leagueId[1]],
      queryFn: () => getLeagueById(leagueId[1]),
    },
    {
      queryKey: ["leagueId", leagueId[2]],
      queryFn: () => getLeagueById(leagueId[2]),
    },
    {
      queryKey: ["leagueId", leagueId[3]],
      queryFn: () => getLeagueById(leagueId[3]),
    },
    {
      queryKey: ["leagueId", leagueId[4]],
      queryFn: () => getLeagueById(leagueId[4]),
    },
  ]);

  const ListAll = () =>
    leaguedata.map((d) => (
      <FixutreList>
        <LeagueList key={d.data}>
          <League>
            <Img src={`${d.data.data.logo_path}`} />
            {d.data.data.name}
          </League>
          <Fixutre>바르셀로나 4: 0 레알마드리드</Fixutre>
        </LeagueList>
      </FixutreList>
    ));

  return (
    <HomeLeftMain>
      <DateBar>TODAY!</DateBar>
      <ListAll />
    </HomeLeftMain>
  );
  // return (
  //   <HomeLeftMain>
  //     <DateBar>TODAY!</DateBar>
  //   </HomeLeftMain>
  // );
}

export default HomeLeft;
