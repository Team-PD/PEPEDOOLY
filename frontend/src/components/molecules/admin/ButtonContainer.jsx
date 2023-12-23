// ButtonContainer.jsx
import React from "react";
import styled from "styled-components";
import { FormBtn } from "../../atoms/admin/FormBtn";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`;

const EditButton = (props) => (
  <FormBtn {...props} background="#aeaeae" color="black" />
);

const ButtonContainer = ({ isEdit, handleEditClick }) => (
  <Container>
    <EditButton onClick={handleEditClick}>
      {isEdit ? "저장" : "수정"}
    </EditButton>
  </Container>
);

export default ButtonContainer;
