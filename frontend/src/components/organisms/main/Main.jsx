import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../page/Login";

import Header from "../../Layout/Header";
import { useUserState } from "../../../hooks/useUserState";
// import Footer from "../Layout/Footer";

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
      {headerHandler()}
      <Header />
      <div>
        <div>
          <div>
            <img
              src={process.env.PUBLIC_URL + "/assets/PepeDooly.svg"}
              alt="PepeDoooly"
              style={{ width: "700px", height: "700px" }}
            />
          </div>
          <div>
            이거슨 페페둘리입니다 최고의 커뮤니티 페페둘리와 당신의 밈과
            밈토큰에 토론하세요!
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
