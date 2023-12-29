import React from "react";
import TabBtn from "../../molecules/admin/TabBtn";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 16%;
  flex-direction: column;
  border-right: 1px double black;
  padding: 20px;
  align-items: center;
`;

const SideBar = ({ setMenu }) => {
  return (
    <Container>
      <TabBtn setMenu={setMenu} />
    </Container>
  );
};

export default SideBar;
