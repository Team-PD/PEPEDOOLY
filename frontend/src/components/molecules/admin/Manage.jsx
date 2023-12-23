import React from "react";
import UserTable from "../../atoms/admin/UserTable";
import styled from "styled-components";

export const Manage = () => {
  const users = [
    {
      Users_uid: 1,
      Users_email: "user1@example.com",
      Users_name: "User One",
      Users_nickname: "user1",
      Users_created_at: "2022-01-01",
    },
    {
      Users_uid: 1,
      Users_email: "user1@example.com",
      Users_name: "User One",
      Users_nickname: "user1",
      Users_created_at: "2022-01-01",
    },
    {
      Users_uid: 1,
      Users_email: "user1@example.com",
      Users_name: "User One",
      Users_nickname: "user1",
      Users_created_at: "2022-01-01",
    },
    {
      Users_uid: 2,
      Users_email: "user2@example.com",
      Users_name: "User Two",
      Users_nickname: "user2",
      Users_created_at: "2022-01-02",
    },
  ];

  return (
    <>
      <UserTable users={users} />
    </>
  );
};
