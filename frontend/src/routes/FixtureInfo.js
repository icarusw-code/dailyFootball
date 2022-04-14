import styled from "styled-components";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFixturesDetailById } from "../api";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { faFutbol, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
const CoachBarTeam = styled.div`
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const PlayerImg = styled.img`
  width: 40px;
  height: 40px;
`;

const BenchTitle = styled.div``;

const BenchContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BenchContent = styled.div`
  display: flex;
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

  //================= 홈팀 라인업 =================//
  const homeLineupInfo =
    fixtureData &&
    fixtureData.lineup.data
      .sort((a, b) => a.formation_position - b.formation_position)
      .map((d) => d.team_id === fixtureData.localTeam.data.id && d)
      .filter((e) => e !== false);

  var homeLineup = [];

  homeFormation &&
    homeFormation.map((d) =>
      homeLineup.push(
        homeLineupInfo
          .splice(0, d)
          .sort((a, b) => b.formation_position - a.formation_position)
      )
    );

  console.log(fixtureData);

  // 골키퍼 설정
  homeLineup.length > 0 && (homeLineup[0][0].detail_position = "GK");

  // 수비수 설정
  homeLineup.length > 0 &&
    (homeLineup[1].length === 3
      ? homeLineup[1].map((d) => (d.detail_position = "CB"))
      : homeLineup[1].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "LB")
            : idx === homeLineup[1].length - 1
            ? (d.detail_position = "RB")
            : (d.detail_position = "CB")
        ));

  // 미드필더 설정
  homeLineup.length > 0 &&
    (homeLineup[2].length < 4
      ? homeLineup[2].map((d) => (d.detail_position = "M"))
      : homeLineup[1].length === 3
      ? homeLineup[2].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "LB")
            : idx === homeLineup[2].length - 1
            ? (d.detail_position = "RB")
            : (d.detail_position = "M")
        )
      : homeLineup[2].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "LW")
            : idx === homeLineup[2].length - 1
            ? (d.detail_position = "RW")
            : (d.detail_position = "M")
        ));

  // 공격수 설정(5칸인 경우)
  homeLineup.length > 4 &&
    (homeLineup[3].length === 1
      ? homeLineup[4].length > 0
        ? homeLineup[3].map((d) => (d.detail_position = "M")) &&
          homeLineup[4].map((d) => (d.detail_position = "ST"))
        : homeLineup[3].map((d) => (d.detail_position = "ST"))
      : homeLineup[3].length === 2
      ? homeLineup[4].length > 0 &&
        homeLineup[3].map((d, idx) =>
          idx === 0 ? (d.detail_position = "LW") : (d.detailIndex = "RW")
        ) &&
        homeLineup[4].map((d) => (d.detail_position = "ST"))
      : homeLineup[4].length > 0 &&
        homeLineup[3].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "LW")
            : idx === homeLineup[3].length - 1
            ? (d.detail_position = "RW")
            : (d.detail_position = "M")
        ) &&
        homeLineup[4].map((d) => (d.detail_position = "ST")));

  // 공격수 설정(4칸인경우)
  homeLineup.length === 4 &&
    (homeLineup[3].length > 2
      ? homeLineup[3].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "LW")
            : idx === homeLineup[3].length - 1
            ? (d.detail_position = "RW")
            : (d.detail_position = "ST")
        )
      : homeLineup[3].map((d) => (d.detail_position = "ST")));

  //   homeLineup && console.log(homeLineup);
  //=============================================//

  //================= 어웨이팀 라인업 =================//
  const awayFormation = fixtureData && [
    1,
    ...fixtureData.formations.visitorteam_formation.split("-").map(Number),
  ];

  const awayLineupInfo =
    fixtureData &&
    fixtureData.lineup.data
      .sort((a, b) => a.formation_position - b.formation_position)
      .map((d) => d.team_id === fixtureData.visitorTeam.data.id && d)
      .filter((e) => e !== false);

  var awayLineup = [];

  awayFormation &&
    awayFormation.map((d) =>
      awayLineup.push(
        awayLineupInfo
          .splice(0, d)
          .sort((a, b) => a.formation_position - b.formation_position)
      )
    );

  // 골키퍼 설정
  awayLineup.length > 0 && (awayLineup[0][0].detail_position = "GK");

  // 수비수 설정
  awayLineup.length > 0 &&
    (awayLineup[1].length === 3
      ? awayLineup[1].map((d) => (d.detail_position = "CB"))
      : awayLineup[1].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "RB")
            : idx === awayLineup[1].length - 1
            ? (d.detail_position = "LB")
            : (d.detail_position = "CB")
        ));

  // 미드필더 설정
  awayLineup.length > 0 &&
    (awayLineup[2].length < 4
      ? awayLineup[2].map((d) => (d.detail_position = "M"))
      : awayLineup[1].length === 3
      ? awayLineup[2].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "RB")
            : idx === awayLineup[2].length - 1
            ? (d.detail_position = "LB")
            : (d.detail_position = "M")
        )
      : awayLineup[2].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "RW")
            : idx === awayLineup[2].length - 1
            ? (d.detail_position = "LW")
            : (d.detail_position = "M")
        ));
  // 공격수 설정(5칸인 경우)
  awayLineup.length > 4 &&
    (awayLineup[3].length === 1
      ? awayLineup[4].length > 0
        ? awayLineup[3].map((d) => (d.detail_position = "M")) &&
          awayLineup[4].map((d) => (d.detail_position = "ST"))
        : awayLineup[3].map((d) => (d.detail_position = "ST"))
      : awayLineup[3].length === 2
      ? awayLineup[4].length > 0 &&
        awayLineup[3].map((d, idx) =>
          idx === 0 ? (d.detail_position = "RW") : (d.detailIndex = "LW")
        ) &&
        awayLineup[4].map((d) => (d.detail_position = "ST"))
      : awayLineup[4].length > 0 &&
        awayLineup[3].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "RW")
            : idx === awayLineup[3].length - 1
            ? (d.detail_position = "LW")
            : (d.detail_position = "M")
        ) &&
        awayLineup[4].map((d) => (d.detail_position = "ST")));

  // 공격수 설정(4칸인경우)
  awayLineup.length === 4 &&
    (awayLineup[3].length > 2
      ? awayLineup[3].map((d, idx) =>
          idx === 0
            ? (d.detail_position = "RW")
            : idx === awayLineup[3].length - 1
            ? (d.detail_position = "LW")
            : (d.detail_position = "ST")
        )
      : awayLineup[3].map((d) => (d.detail_position = "ST")));

  //   console.log(awayLineup);
  //=====================================================//

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
        <TeamContainer>
          {homeLineup.map((d) => (
            <RowContainer>
              {d.map((response) => (
                <div style={{ cursor: "pointer" }}>
                  <PlayerImg src={`${response.player.data.image_path}`} />
                  <div>
                    {response.number}
                    {"   "}
                    {response.player.data.display_name}
                  </div>
                </div>
              ))}
            </RowContainer>
          ))}
        </TeamContainer>
        <div style={{ width: "4px", backgroundColor: "black" }}></div>
        {/*어웨이팀 스쿼드*/}
        <TeamContainer
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          {awayLineup.map((d) => (
            <RowContainer>
              {d.map((response) => (
                <div style={{ cursor: "pointer" }}>
                  <PlayerImg src={`${response.player.data.image_path}`} />
                  <div>
                    {response.number}
                    {"   "}
                    {response.player.data.display_name}
                  </div>
                </div>
              ))}
            </RowContainer>
          ))}
        </TeamContainer>
      </LineupBarSquad>
    </div>
  );

  // 감독
  const CoachBar = () => (
    <CoachBarTeam>
      <div>
        <PlayerImg src={`${fixtureData.localCoach.data.image_path}`} />
        <span style={{ marginLeft: "10px" }}>
          {fixtureData.localCoach.data.fullname}
        </span>
      </div>
      <div>감독</div>
      <div>
        <span style={{ marginRight: "10px" }}>
          {fixtureData.visitorCoach.data.fullname}
        </span>
        <PlayerImg src={`${fixtureData.visitorCoach.data.image_path}`} />
      </div>
    </CoachBarTeam>
  );

  // 교체 / 부상 명단
  const BenchBar = () =>
    fixtureData && (
      <>
        <BenchTitle>교체/부상 명단</BenchTitle>
        <BenchContents>
          <div>
            <div>
              {fixtureData.bench.data.map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.stats.other.minutes_played > 0 && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>평점</div>
                      <div>
                        <span>{d.number}</span>
                        <span>{d.player.data.display_name}</span>
                      </div>
                      <div style={{ color: "rgba(201,221,3,1)" }}>
                        {fixtureData.time.minute - d.stats.other.minutes_played}
                        '
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
            <div>
              {fixtureData.bench.data.map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id &&
                  d.stats.other.minutes_played === null && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>
                        <span>{d.number}</span>
                        <span>{d.player.data.display_name}</span>
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
            <div>
              {fixtureData.sidelined.data.map(
                (d) =>
                  d.team_id === fixtureData.localTeam.data.id && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>
                        <div>{d.player.data.display_name}</div>
                        <div>{d.reason}</div>
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
          </div>
          <div>
            <div>
              {fixtureData.bench.data.map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.stats.other.minutes_played > 0 && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>평점</div>
                      <div>
                        <span>{d.number}</span>
                        <span>{d.player.data.display_name}</span>
                      </div>
                      <div style={{ color: "rgba(201,221,3,1)" }}>
                        {fixtureData.time.minute - d.stats.other.minutes_played}
                        '
                        <FontAwesomeIcon icon={faCircleArrowRight} />
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
            <div>
              {fixtureData.bench.data.map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id &&
                  d.stats.other.minutes_played === null && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>
                        <span>{d.number}</span>
                        <span>{d.player.data.display_name}</span>
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
            <div>
              {fixtureData.sidelined.data.map(
                (d) =>
                  d.team_id === fixtureData.visitorTeam.data.id && (
                    <BenchContent>
                      <PlayerImg src={`${d.player.data.image_path}`} />
                      <div>
                        <div>{d.player.data.display_name}</div>
                        <div>{d.reason}</div>
                      </div>
                    </BenchContent>
                  )
              )}
            </div>
          </div>
        </BenchContents>
      </>
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
          <CoachBar />
          <BenchBar />
        </>
      )}
    </LeagueScreen>
  );
}

export default FixtureInfo;
