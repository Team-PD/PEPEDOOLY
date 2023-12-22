import Info from "../../molecules/admin/Info";
import { Notice } from "../../molecules/admin/Notice";
import { Manage } from "../../molecules/admin/Manage";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
  padding: 20px;
`;

const BodyContainer = ({ menu }) => {
  return (
    <Container>
      {menu === "info" && <Info />}
      {menu === "notice" && <Notice />}
      {menu === "manage" && <Manage />}
    </Container>
  );
};

export default BodyContainer;
