import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFixturesDetailById } from "../api";
import { Spinner } from "react-bootstrap";
import { faFutbol, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeagueScreen = styled.div`
  width: 100%;
  height: 3000px;
  color: white;
  background-color: #272a36;
`;

const LogoImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const ScoreTeamBar = styled.div`
  display: flex;
  font-size: 20px;
`;

const ScoreRoundBar = styled.div``;

const TeamImg = styled.img`
  width: 50px;
  height: 50px;
`;

const TeamImgSmall = styled.img`
  width: 25px;
  height: 25px;
`;

const ScoreGoalBar = styled.div`
  display: flex;
`;

const ScoreOtherBar = styled.div`
  display: flex;
`;

const LineupBarTeam = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LineupBarSquad = styled.div`
  background-color: yellowgreen;
  display: flex;
  width: 100%;
  height: 550px;
`;

const TeamContainer = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;

const RowContainer = styled.div`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function FixtureInfo() {
  const {
    state: { fixtureId },
  } = useLocation();

  // 경기 정보
  const { isLoading: fixtureLoading, data: fixtureData } = useQuery(
    ["fixtureId", fixtureId],
    () => getFixturesDetailById(fixtureId).then((response) => response.data),
    {
      enabled: !!fixtureId,
      refetchOnMount: "always",
    }
  );

  // 스코어 바
  const ScoreBar = () => (
    <div>
      <ScoreRoundBar>
        <LogoImg src={`${fixtureData.league.data.logo_path}`} />
        <span style={{ fontSize: "16px" }}>
          {fixtureData.league.data.name}
          {"    "}
          {fixtureData.round.data.name}라운드
        </span>
      </ScoreRoundBar>
      <hr />
      <ScoreTeamBar>
        <div>
          {fixtureData.localTeam.data.name}
          <TeamImg src={`${fixtureData.localTeam.data.logo_path}`} />
        </div>
        {fixtureData.time.status === "FT" ? (
          <div style={{ marginRight: "10px" }}>
            <span style={{ fontSize: "32px" }}>
              {fixtureData.scores.ft_score}
            </span>
            <span>{fixtureData.time.status}</span>
          </div>
        ) : (
          <div style={{ marginRight: "10px" }}>
            <span style={{ fontSize: "32px" }}>
              {fixtureData.time.starting_at.date}
            </span>
            <span>{fixtureData.time.starting_at.time}</span>
          </div>
        )}

        <div>
          <TeamImg src={`${fixtureData.visitorTeam.data.logo_path}`} />
          {fixtureData.visitorTeam.data.name}
        </div>
      </ScoreTeamBar>
      <hr />
      <ScoreGoalBar>
        <div>
          {fixtureData.goals.data.map(
            (d) =>
              Number(d.team_id) === fixtureData.localTeam.data.id && (
                <ul>
                  <span>{d.player_name}</span>
                  <span>{d.minute}'</span>
                </ul>
              )
          )}
        </div>
        <FontAwesomeIcon icon={faFutbol} />
        <div>
          {fixtureData.goals.data.map(
            (d) =>
              Number(d.team_id) === fixtureData.visitorTeam.data.id && (
                <ul>
                  <span>{d.player_name}</span>
                  <span>{d.minute}'</span>
                </ul>
              )
          )}
        </div>
      </ScoreGoalBar>
      <hr />
      <ScoreOtherBar>
        <div>
          <FontAwesomeIcon icon={faCalendarDay} />
          {fixtureData.time.starting_at.date_time.substr(0, 16)}
        </div>
        <div>경기장 {fixtureData.venue.data.name}</div>
        <div>주심 {fixtureData.referee.data.fullname}</div>
      </ScoreOtherBar>
      <hr />
    </div>
  );

  // 경기 요약 코멘트
  const CommentBar = () =>
    fixtureData && (
      <div>
        <ul>
          {fixtureData.events.data.map((d) =>
            Number(d.team_id) === fixtureData.localTeam.data.id ? (
              <li style={{ display: "flex" }}>
                {d.type === "yellowcard" ? (
                  <>
                    <div>{d.player_name} 옐로카드</div>
                    <span>{d.minute}</span>
                  </>
                ) : d.type === "redcard" ? (
                  <>
                    <div>{d.player_name} 레드카드</div>
                    <span>{d.minute}</span>
                  </>
                ) : d.type === "goal" ? (
                  <>
                    <div>
                      <div>
                        {d.player_name}({d.result}){" "}
                        <FontAwesomeIcon icon={faFutbol} />
                      </div>
                      {d.related_player_name !== null && (
                        <div>어시스트: {d.related_player_name}</div>
                      )}
                    </div>
                    <span>{d.minute}</span>
                  </>
                ) : (
                  d.type === "substitution" && (
                    <>
                      <div>
                        <div style={{ color: "rgba(0,152,95,1)" }}>
                          IN:{d.player_name}
                        </div>
                        <div style={{ color: "rgb(229, 94, 91)" }}>
                          OUT:{d.related_player_name}
                        </div>
                      </div>
                      교체
                      <span>{d.minute}</span>
                    </>
                  )
                )}
              </li>
            ) : (
              <li style={{ display: "flex" }}>
                {d.type === "yellowcard" ? (
                  <>
                    <span>{d.minute}</span>
                    <div>{d.player_name} 옐로카드</div>
                  </>
                ) : d.type === "redcard" ? (
                  <>
                    <span>{d.minute}</span>
                    <div>{d.player_name} 레드카드</div>
                  </>
                ) : d.type === "goal" ? (
                  <>
                    <span>{d.minute}</span>
                    <div>
                      <div>
                        {d.player_name}({d.result}){" "}
                        <FontAwesomeIcon icon={faFutbol} />
                      </div>
                      {d.related_player_name !== null && (
                        <div>어시스트: {d.related_player_name}</div>
                      )}
                    </div>
                  </>
                ) : (
                  d.type === "substitution" && (
                    <>
                      <span>{d.minute}</span>
                      교체
                      <div>
                        <div style={{ color: "rgba(0,152,95,1)" }}>
                          IN:{d.player_name}
                        </div>
                        <div style={{ color: "rgb(229, 94, 91)" }}>
                          OUT:{d.related_player_name}
                        </div>
                      </div>
                    </>
                  )
                )}
              </li>
            )
          )}
        </ul>
      </div>
    );

  const homeFormation = fixtureData && [
    1,
    ...fixtureData.formations.localteam_formation.split("-").map(Number),
  ];

  //   홈팀 라인업
  //   const homeLineup = homeFormation.map((k) =>
  //     fixtureData.lineup.data
  //       .sort((a, b) => a.formation_position - b.formation_position)
  //       .map((d) => d.team_id === fixtureData.localTeam.data.id && d)
  //       .filter((e) => e !== false)
  //   );
  // 홈팀 라인업

  const homeLineupInfo =
    fixtureData &&
    fixtureData.lineup.data
      .sort((a, b) => a.formation_position - b.formation_position)
      .map((d) => d.team_id === fixtureData.localTeam.data.id && d)
      .filter((e) => e !== false);

  var homeLineup = [];

  //   for (const i of homeFormation) {
  //     homeLineup.push(homeLineupInfo.splice(0, i));
  //   }

  homeFormation &&
    homeFormation.map((d) =>
      homeLineup.push(
        homeLineupInfo
          .splice(0, d)
          .sort((a, b) => b.formation_position - a.formation_position)
      )
    );

  homeLineup && console.log(homeLineup);

  // 라인업
  const LineupBar = () => (
    <div>
      <LineupBarTeam>
        <div style={{ display: "flex" }}>
          <TeamImgSmall src={`${fixtureData.localTeam.data.logo_path}`} />
          <div>{fixtureData.formations.localteam_formation}</div>
          {fixtureData.localTeam.data.name}
        </div>
        <div>라인업</div>
        <div style={{ display: "flex" }}>
          <TeamImgSmall src={`${fixtureData.visitorTeam.data.logo_path}`} />
          <div>{fixtureData.formations.visitorteam_formation}</div>
          {fixtureData.visitorTeam.data.name}
        </div>
      </LineupBarTeam>
      <hr />
      <LineupBarSquad>
        {/*홈팀 스쿼드*/}
        {/* <TeamContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => b.formation_position - a.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.position === "G" && <div>{d.player_name}</div>
              )}
          </RowContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => b.formation_position - a.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.position === "D" && <div>{d.player_name}</div>
              )}
          </RowContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => b.formation_position - a.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.position === "M" && <div>{d.player_name}</div>
              )}
          </RowContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => b.formation_position - a.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.position === "A" && <div>{d.player_name}</div>
              )}
          </RowContainer>
        </TeamContainer> */}
        <TeamContainer>
          {homeLineup.map((d) => (
            <RowContainer>
              {d.map((response) => (
                <div>{response.player_name}</div>
              ))}
            </RowContainer>
          ))}
          <RowContainer></RowContainer>
        </TeamContainer>
        {/*어웨이팀 스쿼드*/}
        <TeamContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => a.formation_position - b.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.position === "A" && <div>{d.player_name}</div>
              )}
          </RowContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => a.formation_position - b.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.position === "M" && <div>{d.player_name}</div>
              )}
          </RowContainer>
          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => a.formation_position - b.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.position === "D" && <div>{d.player_name}</div>
              )}
          </RowContainer>

          <RowContainer>
            {fixtureData.lineup.data
              .sort((a, b) => a.formation_position - b.formation_position)
              .map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.position === "G" && <div>{d.player_name}</div>
              )}
          </RowContainer>
        </TeamContainer>
      </LineupBarSquad>
    </div>
  );

  return (
    <LeagueScreen>
      {fixtureLoading ? (
        <Spinner animation="border" variant="secondary" />
      ) : (
        <>
          <ScoreBar />
          <CommentBar />
          <hr />
          <LineupBar />
        </>
      )}
    </LeagueScreen>
  );
}

export default FixtureInfo;
