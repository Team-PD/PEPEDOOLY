import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import NoticeTable from "../../organisms/notice/NoticeTable";

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <h1>공지사항</h1>
      <NoticeTable
        notices={currentNotices}
        startPage={startPage}
        endPage={endPage}
        prevGroup={prevGroup}
        nextGroup={nextGroup}
        paginate={paginate}
        totalPage={Math.ceil(notices.length / noticesPerPage)}
      />
      <Footer />
    </>
  );
};

export default Notice;
