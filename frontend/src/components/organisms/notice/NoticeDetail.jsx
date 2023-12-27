// Organisms/NoticeDetail.jsx
import React from "react";
import NoticeInfo from "../../molecules/notice/NoticeInfo";
import ButtonGroup from "../../molecules/notice/ButtonGroup";
import styled from "styled-components";

const DetailContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  height: calc(100vh - 80px - 200px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticeDetail = ({ notice, onEdit, onDelete, onList, images }) => (
  <DetailContainer>
    <NoticeInfo notice={notice} images={notice.images} />
    <ButtonGroup onEdit={onEdit} onDelete={onDelete} onList={onList} />
  </DetailContainer>
);

export default NoticeDetail;
