import styled from "styled-components";

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#4caf50" : "white")};
  color: ${(props) => (props.active ? "white" : "#007bff")};
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  border: 1.2px solid #4caf50;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #4caf50;
    color: white;
  }
`;

export default PageButton;
