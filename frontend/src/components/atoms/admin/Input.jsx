// frontend/src/components/atoms/admin/Input.jsx
import styled from "styled-components";

const StyledInput = styled.input`
  width: 400px;
  height: 50px;
  margin: 0 auto 20px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
`;

export const Input = ({ onChange, value, readOnly, required }) => {
  return (
    <StyledInput
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      required={required}
    />
  );
};
