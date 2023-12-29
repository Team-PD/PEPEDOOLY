import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../page/Login";

import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { useUserState } from "../../../hooks/useUserState";
import styled from "styled-components";

const MainBody = styled.div`
  flex: 1;
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: greenyellow;
`;

const MainTwo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: #467006;
`;

const MainTwoTop = styled.div`
  /* flex: 1; */
  font-size: 70px;
`;

const MainTwoBox = styled.div`
  display: flex;
  margin: auto;
  /* flex-direction: row; */
`;

const MainTwoBoxin = styled.div`
  margin: 1rem;
  background-color: green;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainThird = styled.div`
  background-color: #315a31;
`;

const MainThirdContents = styled.div`
  font-size: 10rem;
  color: white;
  margin: 1rem;
  background-color: #cefb8a;
`;

const MainForth = styled.div`
  background-color: yellow;
  font-size: 1rem;
`;
const Head4 = styled.h2`
  font-size: 5rem;
`;

const Connents4 = styled.div`
  background-color: #26ff00;
  font-size: 2rem;
  font-weight: 900;
`;

const MainFive = styled.div`
  /* background-color: #5cd3f7; */

  display: flex;
`;

const MainFive1 = styled.div`
  flex: 1;

  background-color: #0eb48d;
  font-size: 2rem;
  color: yellow;

  /* gap: 1rem; */
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
  const { user } = useUserState();

  const LoginRedirect = () => {
    if (user.isLoggedIn) return <Navigate to={"/"} />;

    return <Login />;
  };
  console.log("메인페이지 : ", user);
  const headerHandler = () => {
    return (
      user &&
      user.userData && (
        <div>
          메인페이지
          {user && user.isLoggedIn && user.userData && (
            <div>
              {user.userData.Admin_role
                ? `관리자 : ${user.userData.Admin_nickname}`
                : `유저 : ${user.userData.Users_nickname}`}
            </div>
          )}
        </div>
      )
    );
  };
  return (
    <>
      <MainBox>
        <Header />
        <MainBody>
          <div>
            <div>
              {headerHandler()}
              <img
                src={process.env.PUBLIC_URL + "/assets/epepdooly.png"}
                alt="PepeDoooly"
                style={{ width: "700px", height: "700px" }}
              />
              <p>PEPEDOOLY 개구리 둘리의 모험으로 떠나세요!</p>
            </div>
            <div>
              이거슨 페페둘리입니다 최고의 커뮤니티 페페둘리와 당신의 밈과
              밈토큰에 토론하세요!
            </div>
          </div>
        </MainBody>
        <MainTwo>
          <MainTwoTop>How To Buy</MainTwoTop>
          <MainTwoBox>
            <MainTwoBoxin>PEPEDOOY</MainTwoBoxin>
            <MainTwoBoxin>DOOLY</MainTwoBoxin>
          </MainTwoBox>
        </MainTwo>
        <MainThird>
          <img
            src={process.env.PUBLIC_URL + "/assets/pepejpg.jpg"}
            alt="PepeDoooly"
            style={{ width: "700px", height: "700px" }}
          />

          <img
            src={process.env.PUBLIC_URL + "/assets/dooly.jpg"}
            alt="PepeDoooly"
            style={{ width: "700px", height: "700px" }}
          />

          <MainThirdContents>
            <p>$$PEPE + DOOLY</p>
          </MainThirdContents>
        </MainThird>
        <MainForth>
          <div>
            <img
              src={process.env.PUBLIC_URL + "/assets/epepdooly.png"}
              alt="PepeDoooly"
              style={{ width: "400px", height: "400px" }}
            />
          </div>
          <div>
            <Head4>TOKEN PD</Head4>
            <Connents4>
              <Head4> Fair to drop Community Providing</Head4>
            </Connents4>
            <Connents4>
              <p>The $PEPEDOOLY coin is based on the BRC20 and was</p>
              <p>created in December 2023. By January 1st", 2024, all</p>
              <p>$PEPEDOOLY coin had been minted.</p>
              <p>The $PEPEDOOLY is a memecoin with no intrinsic value </p>
              <p>or expected financial return and is purely for </p>
              <p>entertainment purposes. There is no formal team</p>
              <p>or roadmap associated with the token.</p>
              <p>It is entirely useless and intended solely for</p>
              <p>entertainment purposes. Just for fun.</p>
            </Connents4>
          </div>
        </MainForth>
        <h1>Roadmap</h1>
        <MainFive>
          <MainFive1>
            <div>100x</div>
            <div>
              <h2>Phase1</h2>
              <p>
                <i />
                Community user
              </p>
              <p>Aws hosting</p>
              <p>10000users</p>
            </div>
          </MainFive1>

          <MainFive1>
            <div>1000x</div>
            <div>
              <h2>Phase2</h2>
              <p>
                <i />
                Community Airdrop
              </p>
              <p>Community Dao</p>
              <p>10000000holders</p>
            </div>
          </MainFive1>

          <MainFive1>
            <div>10000x</div>
            <div>
              <h2>Phase2</h2>
              <p>
                <i />
                PEEPDOOLY TO THE MOON~~!
              </p>
              <p>Community Attack</p>
              <p>10$$$</p>
            </div>
          </MainFive1>
        </MainFive>

        <Footer />
      </MainBox>
    </>
  );
};

export default Main;
