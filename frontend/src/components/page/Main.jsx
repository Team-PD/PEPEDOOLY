import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Register from "./Register";
import Comments from "../organisms/comments/Comments";
import Board from "../board/Board";
import AdminLogin from "./AdminLogin";
// import Header from "../Layout/Header";
import MainComponent from "../organisms/main/Main";
import Header from "../Layout/Header";
import DashBoard from "./DashBoard";
import { useUserState } from "../../hooks/useUserState";

// import Footer from "../Layout/Footer";

const Main = () => {
  const { user } = useUserState();

  const LoginRedirect = () => {
    if (user.isLoggedIn) return <Navigate to={"/"} />;
    return <Login />;
  };
  console.log("메인페이지 : ", user);

  const headerHandler = () => {
    {
      user && user.userData && (
        <div>
          메인페이지{" "}
          {user && user.isLoggedIn && user.userData && (
            <div>메인페이지 {user?.userData?.Users_nickname}</div>
          )}
        </div>
      );
    }
  };
  return (
    <>
      {/* <Header />
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
      </div> */}

      {user && user.userData && (
        <div>
          메인페이지{" "}
          {user && user.isLoggedIn && user.userData && (
            <div>메인페이지 {user?.userData?.Users_nickname}</div>
          )}
        </div>
      )}
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* 
      <Header />
      <Footer /> */}
      </Routes>
    </>
  );
};

export default Main;
