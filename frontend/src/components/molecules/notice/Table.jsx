import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Th from "../../atoms/notice/Th";
import Td from "../../atoms/notice/Td";

const StyledTable = styled.table`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  border: 1.5px dashed black;
`;

const Table = ({ notices }) => (
  <StyledTable>
    <thead>
      <tr>
        <Th width="10%">게시물번호</Th>
        <Th width="50%">제목</Th>
        <Th width="20%">작성자</Th>
        <Th width="20%">작성일</Th>
      </tr>
    </thead>
    <tbody>
      {notices.map((notice) => (
        <tr key={notice.noticeId}>
          <Td>{notice.noticeId}</Td>
          <Td>
            <Link to={`/notice/${notice.noticeId}`}>{notice.noticeTitle}</Link>
          </Td>
          <Td>{notice.noticeWriter}</Td>
          <Td>{notice.noticeCreatedAt}</Td>
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

export default Table;
