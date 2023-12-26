import React from "react";
import styled from "styled-components";
import PageButton from "../../atoms/notice/PageButton";

const StyledPageList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PageList = ({
  startPage,
  endPage,
  prevGroup,
  nextGroup,
  paginate,
  totalPage,
}) => (
  <StyledPageList>
    {startPage > 0 && <PageButton onClick={prevGroup}>이전</PageButton>}
    {Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((number) => (
      <li key={number}>
        <PageButton onClick={() => paginate(number)}>{number}</PageButton>
      </li>
    ))}
    {endPage < totalPage && <PageButton onClick={nextGroup}>다음</PageButton>}
  </StyledPageList>
);

export default PageList;
