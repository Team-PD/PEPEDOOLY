import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import NoticeTable from "../../organisms/notice/NoticeTable";
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
        setNotices(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchNotices();
  }, []);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <TapleContainer>
        <Title>공지사항</Title>
        <NoticeTable
          notices={currentNotices}
          startPage={startPage}
          endPage={endPage}
          prevGroup={prevGroup}
          nextGroup={nextGroup}
          paginate={paginate}
          currentPage={currentPage}
          totalPage={Math.ceil(notices.length / noticesPerPage)}
        />
      </TapleContainer>
      <Footer />
    </>
  );
};

const TapleContainer = styled.div`
  background-color: #d5ffcf;
  height: calc(100vh - 80px - 210px);
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  padding: 20px;
`;

export default Notice;
