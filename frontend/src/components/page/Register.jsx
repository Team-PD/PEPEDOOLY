import styled from "styled-components";
import Button from "../atoms/login/Button";
import Input from "../atoms/login/Input";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickname] = useState("");
  const movePage = useNavigate();

  function handleEmailChange(event) {
    console.log(event.target.value);
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function handleNickNameChange(event) {
    console.log(event.target.value);
    setNickname(event.target.value);
  }

  function goRegister() {
    movePage("/login");
  }

  function signupUser(email, password, name, nickname) {
    const signupData = {
      email: email,
      password: password,
      name: name,
      nickname: nickname,
    };
    console.log(signupData);

    axios

      .post("http://localhost:4000/users/signup", signupData, {
        withCredentials: "include",
      })
      .then((response) => {
        // 회원가입 성공 시 처리

        console.log("회원가입 성공", response.data);
        goRegister("/login");
      })
      .catch((error) => {
        // 회원가입 실패 시 처리
        console.error("회원가입 실패", error);
        movePage("/");
      });
  }
  return (
    <>
      <MainContainer
        onSubmit={(e) => {
          e.preventDefault();
          const {
            email: userEmail,
            password: userPassword,
            name: userName,
            nickname: userNickname,
          } = e.target;
          signupUser(
            userEmail.value,
            userPassword.value,
            userName.value,
            userNickname.value
          );
        }}
      >
        <WelcomeText>
          <img src="./" alt="" />
          PepeDooly
        </WelcomeText>
        <InputContainer>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            type="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <Input
            type="nickname"
            placeholder="nickName"
            name="nickname"
            value={nickName}
            onChange={handleNickNameChange}
          />
        </InputContainer>
        <ButtonContainer>
          <Button content="SignUp" />
        </ButtonContainer>
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
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
