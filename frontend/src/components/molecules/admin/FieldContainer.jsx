// FieldContainer.jsx
import React from "react";
import styled from "styled-components";
// import ProfileImage from "../../atoms/admin/ProfileImage";
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

const FieldContainer = ({
  admin,
  isEdit,
  fields,
  handleInputChangeLocal,
  handleImageChange,
}) => (
  <Container>
    {/* <ProfileImage
      onImageChange={handleImageChange}
      admin={admin}
      isEdit={isEdit}
    /> */}
    <FieldWrapper
      fields={fields}
      isEdit={isEdit}
      handleInputChangeLocal={handleInputChangeLocal}
    />
  </Container>
);

export default FieldContainer;
