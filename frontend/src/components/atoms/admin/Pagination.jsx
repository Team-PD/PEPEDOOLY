import React from "react";
import styled from "styled-components";

const PaginationList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const PaginationItem = styled.li`
  margin: 0 5px;
`;

const PaginationLink = styled.a`
  background-color: ${(props) =>
    props.className === "active" ? "#4caf50" : "white"};
  color: ${(props) => (props.className === "active" ? "white" : "#007bff")};
  padding: 10px 15px;
  border: 1.2px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.className === "active" ? "#4caf50" : "#4caf50"};
  }
`;

const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
  startPage,
  endPage,
  prevGroup,
  nextGroup,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <PaginationList>
        {startPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={prevGroup}>{"<"}</PaginationLink>
          </PaginationItem>
        )}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < pageNumbers.length && (
          <PaginationItem>
            <PaginationLink onClick={nextGroup}>{">"}</PaginationLink>
          </PaginationItem>
        )}
      </PaginationList>
    </nav>
  );
};

export default Pagination;
