import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: #33363f;
`;
const HeaderTitle = styled.div`
  font-size: 30px;
  margin: auto;
  text-align: center;
  width: 20%;
  color: #aba9e9;
  font-weight: bold;
`;
const HeaderItems = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  color: white;
`;
const HeaderItem = styled.div`
  margin: auto;
`;

const HeaderSearch = styled.input`
  margin-right: 30px;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

function Header() {
  return (
    <HeaderMain>
      <HeaderTitle>Daily Football</HeaderTitle>
      <HeaderItems>
        <HeaderSearch placeholder="선수, 리그 검색" />
        <HeaderItem>
          <CustomLink to="/statistics">통계</CustomLink>
        </HeaderItem>
        <HeaderItem>
          <CustomLink to="/column">칼럼</CustomLink>
        </HeaderItem>
        <HeaderItem>
          <CustomLink to="/news">뉴스</CustomLink>
        </HeaderItem>
        <HeaderItem>
          <CustomLink to="/signup">회원가입</CustomLink>
        </HeaderItem>
        <HeaderItem>로그인</HeaderItem>
      </HeaderItems>
    </HeaderMain>
  );
}

export default Header;
