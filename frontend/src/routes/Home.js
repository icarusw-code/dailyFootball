import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import HomeLeft from "../components/Home/HomeLeft/HomeLeft";
import HomeRight from "../components/Home/HomeRight/HomeRight";
const HomeMain = styled.div`
  min-height: 110vh;
  background-color: #272a36;
  color: white;
`;

const styles = {
  col: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    marginLeft: 0,
    marginRight: 0,
  },
  font: {
    fontSize: 13,
  },
};

function Home() {
  return (
    <HomeMain>
      <h1>홈페이지</h1>
      <Container>
        <Row>
          <Col xs={7}>
            <HomeLeft />
          </Col>
          <Col xs={5}>
            <HomeRight />
          </Col>
        </Row>
      </Container>
    </HomeMain>
  );
}

export default Home;
