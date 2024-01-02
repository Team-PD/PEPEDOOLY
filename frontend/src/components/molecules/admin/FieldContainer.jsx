import React from "react";
import styled from "styled-components";
import FieldWrapper from "./FieldWrapper";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  gap: 0 120px;
  justify-content: center;
`;

const FieldContainer = ({ isEdit, fields, handleInputChangeLocal }) => (
  <Container>
    <FieldWrapper
      fields={fields}
      isEdit={isEdit}
      handleInputChangeLocal={handleInputChangeLocal}
    />
  </Container>
);

export default FieldContainer;
