import React, { useState, useEffect } from "react";
import SideBar from "../organisms/admin/SideBar";
import MainContainer from "../organisms/admin/MainContainer";
import styled from "styled-components";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../hooks/useUserState";

const PageContainer = styled.div`
  display: flex;
`;

const Admin = () => {
  const [menu, setMenu] = useState("info");
  const navigate = useNavigate();
  const { user, setLoggedInUser } = useUserState();

  useEffect(() => {}, [user]);
  return (
    <>
      <Header />
      <PageContainer>
        <SideBar setMenu={setMenu} />
        <MainContainer menu={menu} />
      </PageContainer>
      <Footer />
    </>
  );
};

export default Admin;
