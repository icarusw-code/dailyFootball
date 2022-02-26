import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const FooterMain = styled.footer`
  width: 100%;
  background-color: #33363f;
  display: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
`;

const FooterContentForm = styled.div`
  margin: 20px 0px;
`;

const FooterContentTitle = styled.span`
  display: block;
  font-weight: bold;
  font-size: 15px;
  color: white;
`;

const FooterContent = styled.span`
  display: block;
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

function Footer() {
  return (
    <FooterMain>
      <Container>
        <Row>
          <Col style={styles.col} xs={4}>
            <FooterContentForm>
              <FooterContentTitle>고객센터</FooterContentTitle>
              <FooterContent>1588-1234</FooterContent>
              <br />
              <FooterContentTitle>상담 가능 시간</FooterContentTitle>
              <FooterContent>
                평일 오전 9시 ~ 오후 6시 <br />
                (주말, 공휴일 제외)
              </FooterContent>
            </FooterContentForm>
          </Col>
          <Col style={styles.col} xs={4}>
            <FooterContentForm>
              <FooterContentTitle>관리자 (24시간 접수 가능)</FooterContentTitle>
              <FooterContent>ghlim909@naver.com</FooterContent>
              <FooterContent>cordelia357@naver.com</FooterContent>
              <br />
              <FooterContentTitle>
                Daily Football은 축구 경기 평점 커뮤니티입니다. 이외의 관련
                사항에는 책임지지 않습니다.
              </FooterContentTitle>
            </FooterContentForm>
          </Col>
          <Col style={styles.col} xs={4}>
            <FooterContentForm>
              <FooterContentTitle>Daily Football(주)</FooterContentTitle>
              <FooterContentTitle>
                서울시 강남구 테헤란로 212
              </FooterContentTitle>
              <FooterContent style={styles.font}>
                <br />© 2022 Daily Football, Inc. All Rights Reserved
              </FooterContent>
            </FooterContentForm>
          </Col>
        </Row>
      </Container>
    </FooterMain>
  );
}

export default Footer;
