import React from "react";
import { Label } from "../../atoms/admin/Label";
import { Input } from "../../atoms/admin/Input";
import styled from "styled-components";

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FormLabel = styled.div`
  min-width: 80px;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const EditForm = ({
  isEdit,
  onInputChange,
  inputValue,
  fieldName,
  fieldType,
}) => {
  return (
    <FormRow>
      <FormLabel>{fieldName} :</FormLabel>
      <FormContainer>
        {isEdit ? (
          <Input
            onChange={onInputChange}
            value={inputValue}
            readOnly={fieldType === "noEdit"}
            required={fieldType === "password"}
          />
        ) : (
          <Label>{inputValue}</Label>
        )}
      </FormContainer>
    </FormRow>
  );
};

export default EditForm;
