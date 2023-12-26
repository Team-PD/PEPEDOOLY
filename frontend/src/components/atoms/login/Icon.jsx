import styled from "styled-components";

export default function Icon({ color, children, onClick }) {
  return (
    <StyledIcon background={color} onClick={onClick}>
      {children}
    </StyledIcon>
  );
}

const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
