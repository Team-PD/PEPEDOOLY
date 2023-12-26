import React from "react";
import Button from "../../atoms/notice/Button";
import styled from "styled-components";

const ButtonGroupContainer = styled.div`
  text-align: center;
`;

const ButtonGroup = ({ onEdit, onDelete, onList }) => (
  <ButtonGroupContainer>
    <Button onClick={onEdit}>글 수정</Button>
    <Button onClick={onDelete}>글 삭제</Button>
    <Button onClick={onList}>목록으로</Button>
  </ButtonGroupContainer>
);

export default ButtonGroup;
