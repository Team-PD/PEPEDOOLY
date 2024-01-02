import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditForm from "../../molecules/admin/EditForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const FieldWrapper = ({ fields, isEdit, handleInputChangeLocal }) => {
  return (
    <Wrapper>
      <>
        {fields.map(
          (field) =>
            (!field.isPassword || isEdit) && (
              <EditForm
                key={field.id}
                isEdit={isEdit}
                fieldName={field.name}
                fieldType={field.type}
                onInputChange={(e) =>
                  handleInputChangeLocal(field.id, e.target.value)
                }
                inputValue={field.value}
              />
            )
        )}
      </>
    </Wrapper>
  );
};

export default FieldWrapper;
