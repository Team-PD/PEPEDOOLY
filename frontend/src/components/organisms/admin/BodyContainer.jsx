import Info from "../../molecules/admin/Info";
import { NoticeCreate } from "../../molecules/admin/NoticeCreate";
import { Manage } from "../../molecules/admin/Manage";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
`;

const BodyContainer = ({ menu }) => {
  return (
    <Container>
      {menu === "info" && <Info />}
      {menu === "notice" && <NoticeCreate />}
      {menu === "manage" && <Manage />}
    </Container>
  );
};

export default BodyContainer;
