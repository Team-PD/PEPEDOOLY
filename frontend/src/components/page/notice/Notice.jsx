import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import styled from "styled-components";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(0);
  const noticesPerPage = 10;
  const pagesPerGroup = 10;

  const startPage = currentGroup * pagesPerGroup + 1;
  const endPage = Math.min(
    (currentGroup + 1) * pagesPerGroup,
    Math.ceil(notices.length / noticesPerPage)
  );

  const nextGroup = () => setCurrentGroup(currentGroup + 1);
  const prevGroup = () => setCurrentGroup(currentGroup - 1);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await axios.get("http://localhost:4000/notice");
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNotices();
  }, []);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(notices.length / noticesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div>
        <h1>공지사항</h1>
        <Table>
          <thead>
            <tr>
              <Th width="10%">게시물번호</Th>
              <Th width="50%">제목</Th>
              <Th width="20%">작성자</Th>
              <Th width="20%">작성일</Th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map((notice) => (
              <tr key={notice.noticeId}>
                <Td>{notice.noticeId}</Td>
                <Td>
                  <Link to={`/notice/${notice.noticeId}`}>
                    {notice.noticeTitle}
                  </Link>
                </Td>
                <Td>{notice.noticeWriter}</Td>
                <Td>{notice.noticeCreatedAt}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav>
          <PageList>
            {currentGroup > 0 && (
              <PageButton onClick={prevGroup}>이전</PageButton>
            )}
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((number) => (
              <li key={number}>
                <PageButton onClick={() => paginate(number)}>
                  {number}
                </PageButton>
              </li>
            ))}
            {endPage < Math.ceil(notices.length / noticesPerPage) && (
              <PageButton onClick={nextGroup}>다음</PageButton>
            )}
          </PageList>
        </nav>
      </div>
      <Footer />
    </>
  );
};

const Table = styled.table`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f2f2f2;
  width: ${(props) => props.width || "auto"};
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const PageList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PageButton = styled.button`
  color: #007bff;
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #007bff;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export default Notice;
