import styled from "styled-components";
import Button from "../../atoms/login/Button";
import Input from "../../atoms/login/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header";
import { useUserState } from "../../../hooks/useUserState";

function AdminLogin() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const { setLoggedInUser } = useUserState();

  function handleIdChange(event) {
    setAdminId(event.target.value);
  }

  function handlePasswordChange(event) {
    setAdminPassword(event.target.value);
  }

  function loginAdmin() {
    const loginData = {
      adminId: adminId,
      adminPassword: adminPassword,
    };

    axios
      .post("http://localhost:4000/admin/login", loginData, {
        withCredentials: "include",
      })
      .then((response) => {
        setLoggedInUser(response.data);

        navigate("/");
        console.log("로그인 성공", response);
      })
      .catch((error) => {
        console.error("로그인 실패", error);
      });
  }

  return (
    <>
      <Header />
      <MainContainer
        onSubmit={(e) => {
          e.preventDefault();
          loginAdmin();
        }}
      >
        <WelcomeText>
          <img src="./" alt="" />
          Admin Login
        </WelcomeText>
        <InputContainer>
          <Input
            type="text"
            placeholder="ID"
            name="adminId"
            value={adminId}
            onChange={handleIdChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="adminPassword"
            value={adminPassword}
            onChange={handlePasswordChange}
          />
        </InputContainer>
        <ButtonContainer>
          <Button content="Login" />
        </ButtonContainer>
        <ReturnUserLogin onClick={() => navigate("/login")}>
          RETURN USER LOGIN
        </ReturnUserLogin>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  height: 80vh;
  width: 30vw;
  background: #71be71;
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  /* backdrop-filter: blur(8.5px); */
  /* -webkit-backdrop-filter: blur(8.5px); */
  border-radius: 10px;
  color: #000504;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ReturnUserLogin = styled.h3`
  margin-top: 50px;
  cursor: pointer;
`;
export default AdminLogin;
