import styled from "styled-components";

const PageButton = styled.button`
  color: #007bff;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #007bff;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export default PageButton;
