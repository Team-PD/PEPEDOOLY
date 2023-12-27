// Manage.jsx
import React, { useEffect, useState } from "react";
import UserTable from "../../atoms/admin/UserTable";
import styled from "styled-components";
import Pagination from "../../atoms/admin/Pagination";
import axios from "axios";

export const Manage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);
  const usersPerPage = 10;
  const pagesPerGroup = 5;

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(
    (currentGroup + 1) * pagesPerGroup,
    Math.ceil(users.length / usersPerPage)
  );

  const nextGroup = () => setCurrentGroup(currentGroup + 1);
  const prevGroup = () => setCurrentGroup(currentGroup - 1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await axios.delete(`http://localhost:4000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <UserTable users={currentUsers} onDelete={handleDelete} />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        prevGroup={prevGroup}
        nextGroup={nextGroup}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
