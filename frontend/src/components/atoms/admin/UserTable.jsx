import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 14px 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #4caf50;
    color: white;
    position: sticky;
    top: 0;
  }
`;

const UserTable = ({ users, onDelete }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>num</th>
          <th>Email</th>
          <th>Name</th>
          <th>Nickname</th>
          <th>Created_at</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.nickname}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>{" "}
            <td>
              <button onClick={() => onDelete(user.id)}>삭제</button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default UserTable;
