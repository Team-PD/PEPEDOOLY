import React from "react";
import Table from "../../molecules/notice/Table";
import PageList from "../../molecules/notice/PageList";

const NoticeTable = ({
  notices,
  startPage,
  endPage,
  prevGroup,
  nextGroup,
  paginate,
  totalPage,
  currentPage,
}) => (
  <>
    <Table notices={notices} />
    <PageList
      startPage={startPage}
      endPage={endPage}
      prevGroup={prevGroup}
      nextGroup={nextGroup}
      paginate={paginate}
      totalPage={totalPage}
      currentPage={currentPage}
    />
  </>
);

export default NoticeTable;
