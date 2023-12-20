import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderStyle = styled.nav`
  top: 0;
  font-size: 15px;
  width: 100%;
  height: 80px;
  background-color: #3bdd3b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 2px solid #fff;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    height: 60px;
    font-size: 13px;
  }
`;

const Logo = styled.img`
  width: auto;
  height: 100%;
`;

const LogoLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const RightMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const MenuItem = styled.li`
  margin-left: 20px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #ff9900;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/admin/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 요청 실패", error);
    }
  };

  return (
    <HeaderStyle>
      <LogoLink to="/">
        <Logo
          src={process.env.PUBLIC_URL + "/assets/PepeDooly.svg"}
          alt="PepeDoooly"
        />
      </LogoLink>

      <ul>
        <li onClick={logout}>로그아웃</li>
      </ul>

      <RightMenu>
        <MenuItem>
          <Link to="/board">게시판</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin">어드민</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard">대시보드</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login">로그인</Link>
        </MenuItem>
      </RightMenu>
    </HeaderStyle>
  );
};

export default Header;
