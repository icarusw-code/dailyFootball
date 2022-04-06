import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getFixturesById,
  getLeagueById,
  getLeagueStatisticsById,
  getPlayerById,
  getSeasonsById,
  getSquadWithPlayerById,
  getTeamById,
  getTeamInfoById,
} from "../api";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";

const LeagueScreen = styled.div`
  width: 100%;
  height: 3000px;
  color: white;
  background-color: #272a36;
`;

const PlayerNameBar = styled.div`
  display: flex;
  margin-left: 50px;
`;

const PlayerImg = styled.img`
  width: 70px;
  height: 70px;
`;

const PlayerNameContents = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PlayerTeamContents = styled.div`
  font-size: 15px;
`;

const TeamImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const PlayerPhysicalContents = styled.div``;

const SummaryBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

function PlayerInfo() {
  const {
    state: {
      teamId,
      teamName,
      seasonId,
      playerId,
      playerName,
      leagueId,
      countryId,
      currentRound,
    },
  } = useLocation();

  // ==================이동===============//
  const navigate = useNavigate();
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

  // ====================================//

  // 리그 정보
  const { isLoading: leagueLoading, data: leagueData } = useQuery(
    ["leagueId", leagueId],
    () => getLeagueById(leagueId).then((response) => response.data),
    {
      enabled: !!leagueId,
    }
  );

  // 팀 상세 정보
  const { isLoading: teamInfoLoading, data: teamInfoData } = useQuery(
    ["teamInfo", { teamId, seasonId }],
    () => getTeamInfoById(teamId, seasonId),
    {
      enabled: !!seasonId && !!teamId,
      refetchOnMount: "always",
    }
  );

  // 선수 상세 정보
  const { isLoading: playerInfoLoading, data: playerInfoData } = useQuery(
    ["playerInfo", playerId],
    () => getPlayerById(playerId).then((response) => response.data),
    {
      enabled: !!playerId,
      refetchOnMount: "always",
    }
  );

  // 팀 스쿼드 정보
  const { isLoading: squadLoading, data: squadsdata } = useQuery(
    [
      ["seasonId", "teamId"],
      [seasonId, teamId],
    ],
    () =>
      getSquadWithPlayerById(teamId, seasonId).then(
        (response) => response.data
      ),
    {
      enabled: !!seasonId && !!teamId,
      refetchOnMount: "always",
    }
  );

  // 현재 시즌 정보
  const { isLoading: currentSeasonLoading, data: currentSeasonData } = useQuery(
    ["seasonId!", seasonId],
    () => getSeasonsById(seasonId).then((response) => response.data)
  );

  // 시즌 상세 정보
  const { isLoading: seasonLoading, data: seasondata } = useQuery(
    ["seasonId", seasonId],
    () => getLeagueStatisticsById(seasonId).then((response) => response.data),
    {
      enabled: !!seasonId,
      refetchOnMount: "always",
    }
  );
  // 모든 팀 아이디
  const allTeamId =
    seasondata && seasondata[0].standings.data.map((d) => d.team_id);

  // 리그 내 모든 팀 정보
  const { isLoading: allTeamLoading, data: allTeamData } = useQuery(
    ["allTeamIdList", allTeamId],
    () =>
      Promise.all(
        allTeamId.map((d) => getTeamById(d)),
        {
          enabled: !!allTeamId,
          refetchOnMount: "always",
        }
      )
  );

  const fixtureIdList =
    teamInfoData &&
    teamInfoData.latest.data.map((d) => d.time.status === "FT" && d.id);

  // 최근 경기 정보
  const { isLoading: latestFixtureLoading, data: latestFixtureDataInfo } =
    useQuery(
      ["fixtureIdList", fixtureIdList],
      () => Promise.all(fixtureIdList.map((f) => getFixturesById(f))),
      {
        enabled: !!fixtureIdList,
        refetchOnMount: "always",
      }
    );

  // 최근 경기 선수 기록
  const latestFixtureData =
    latestFixtureDataInfo &&
    latestFixtureDataInfo
      .map((d) => d.data)
      .map((r) =>
        [r.lineup.data, r.bench.data]
          .flat()
          .map((f) => (f.player_id === playerId ? f : (f[0] = r.id)))
      )
      .map((r) => Array.from(new Set(r)));

  // 선수 신체 정보
  const PlayerPhysical = () => (
    <PlayerPhysicalContents>
      <Row>
        <Col>
          <div>키/몸무게</div>
          <div>
            {playerInfoData.height}/{playerInfoData.weight}
          </div>
        </Col>
        <Col>
          <div>나이</div>
          <div>{playerInfoData.birthdate}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>국적</div>
          <div>
            <TeamImg src={`${playerInfoData.country.data.image_path}`} />
            {playerInfoData.country.data.name}
          </div>
        </Col>
        <Col>
          <div>등번호</div>
          {squadsdata.map(
            (d) => d.player_id === playerId && <div>{d.number}</div>
          )}
        </Col>
      </Row>
    </PlayerPhysicalContents>
  );

  const FixtureResult = () =>
    latestFixtureData &&
    teamInfoData &&
    allTeamData && (
      <div>
        <div>최근 경기 기록</div>
        <div>
          <TeamImg src={`${leagueData.logo_path}`} />
          {leagueData.name}
          {"  "}
          {currentSeasonData.name}
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>날짜</th>
              <th>vs</th>
              <th>출전 시간</th>
              <th>득점</th>
              <th>어시스트</th>
              <th>옐로카드</th>
              <th>레드카드</th>
              <th>평점</th>
            </tr>
          </thead>
          <tbody>
            {teamInfoData.latest.data.map(
              (d) =>
                d.time.status === "FT" && (
                  <tr>
                    <td>{d.time.starting_at.date}</td>
                    {allTeamData.map((all) =>
                      d.localteam_id !== teamId
                        ? all.id === d.localteam_id && (
                            <td>
                              <TeamImg src={`${all.logo_path}`} />
                              {all.name}
                            </td>
                          )
                        : all.id === d.visitorteam_id &&
                          d.visitorteam_id !== teamId && (
                            <td>
                              <TeamImg src={`${all.logo_path}`} />
                              {all.name}
                            </td>
                          )
                    )}
                    {latestFixtureData.map(
                      (result) =>
                        result[0] === d.id &&
                        (result.length === 1 ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.other
                            .minutes_played === null ? (
                          <td>0</td>
                        ) : (
                          <td>
                            {
                              result[result.length - 1].stats.other
                                .minutes_played
                            }
                          </td>
                        ))
                    )}
                    {latestFixtureData.map(
                      (result) =>
                        result[0] === d.id &&
                        (result.length === 1 ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.other
                            .minutes_played === null ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.goals.owngoals >
                          0 ? (
                          <td>
                            {result[result.length - 1].stats.goals.scored +
                              result[result.length - 1].stats.goals.owngoals}
                            (*{result[result.length - 1].stats.goals.owngoals})
                          </td>
                        ) : (
                          <td>
                            {result[result.length - 1].stats.goals.scored +
                              result[result.length - 1].stats.goals.owngoals}
                          </td>
                        ))
                    )}
                    {latestFixtureData.map(
                      (result) =>
                        result[0] === d.id &&
                        (result.length === 1 ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.other
                            .minutes_played === null ? (
                          <td>0</td>
                        ) : (
                          <td>
                            {result[result.length - 1].stats.goals.assists}
                          </td>
                        ))
                    )}
                    {latestFixtureData.map(
                      (result) =>
                        result[0] === d.id &&
                        (result.length === 1 ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.other
                            .minutes_played === null ? (
                          <td>0</td>
                        ) : (
                          <td>
                            {result[result.length - 1].stats.cards.yellowcards}
                          </td>
                        ))
                    )}
                    {latestFixtureData.map(
                      (result) =>
                        result[0] === d.id &&
                        (result.length === 1 ? (
                          <td>0</td>
                        ) : result[result.length - 1].stats.other
                            .minutes_played === null ? (
                          <td>0</td>
                        ) : (
                          <td>
                            {result[result.length - 1].stats.cards.redcards}
                          </td>
                        ))
                    )}
                    <td>-</td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </div>
    );

  return (
    <LeagueScreen>
      {leagueLoading ||
      teamInfoLoading ||
      playerInfoLoading ||
      squadLoading ||
      currentSeasonLoading ||
      seasonLoading ||
      allTeamLoading ||
      latestFixtureLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <>
          <PlayerNameBar>
            <PlayerImg src={`${playerInfoData.image_path}`} />
            <div>
              <PlayerNameContents>{playerName}</PlayerNameContents>
              <PlayerTeamContents
                style={{ cursor: "pointer" }}
                onClick={() => {
                  goToTeam(
                    leagueId,
                    seasonId,
                    countryId,
                    teamId,
                    teamName,
                    currentRound
                  );
                }}
              >
                <TeamImg src={`${teamInfoData.logo_path}`} />
                {teamName}
              </PlayerTeamContents>
            </div>
          </PlayerNameBar>
          <Container>
            <Row>
              <Col>
                <PlayerPhysical />
              </Col>
              <Col>포지션</Col>
              <Col>포지션 그림</Col>
            </Row>
          </Container>
          <SummaryBar>
            <FixtureResult />
            <div>Stat</div>
          </SummaryBar>
        </>
      )}
    </LeagueScreen>
  );
}

export default PlayerInfo;
