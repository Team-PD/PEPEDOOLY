import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Admin from "./admin/Admin";
import Register from "./Register";
import Comments from "../organisms/comments/Comments";
import Board from "../board/Board";
import AdminLogin from "./admin/AdminLogin";
import Notice from "./notice/Notice";
// import Header from "../Layout/Header";
import MainComponent from "../organisms/main/Main";
import Header from "../Layout/Header";
import DashBoard from "./DashBoard";
import { useUserState } from "../../hooks/useUserState";
import UserDash from "./UserDash";
import NoticeView from "./notice/NoticeView";
import { NoticeUpdate } from "./notice/NoticeUpdate";
import UserPosts from "./UserPosts";
import UserComments from "./UserComments";
// import Footer from "../Layout/Footer";

const Main = () => {
    const { user } = useUserState();

    const LoginRedirect = () => {
        if (user.isLoggedIn) return <Navigate to={"/"} />;
        return <Login />;
    };
    useEffect(() => {
        console.log("메인페이지 : ", user);
    }, []);

    const headerHandler = () => {
        {
            user && user.userData && (
                <div>
                    메인페이지{" "}
                    {user && user.isLoggedIn && user.userData && <div>메인페이지 {user?.userData?.Users_nickname}</div>}
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

            <Routes>
                <Route path="/" element={<MainComponent />} />
                <Route path="/userDash" element={<UserDash />} />
                <Route path="/login" element={<LoginRedirect />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/notice/:id" element={<NoticeView />} />
                <Route path="notice/edit/:id" element={<NoticeUpdate />} />
                <Route path="/register" element={<Register />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/board/*" element={<Board />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/userPosts" element={<UserPosts />} />
                <Route path="/userComments" element={<UserComments />} />
                {/* 
      <Header />
      <Footer /> */}
            </Routes>
        </>
    );
};

export default Main;
