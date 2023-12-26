import styled from "styled-components";

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;
  width: ${(props) => props.width || "auto"};
`;

export default Th;
