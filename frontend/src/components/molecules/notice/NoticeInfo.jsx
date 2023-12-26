import React from "react";
import Title from "../../atoms/notice/Title";
import Writer from "../../atoms/notice/Writer";
import CreatedAt from "../../atoms/notice/CreatedAt";
import Content from "../../atoms/notice/Content";
import styled from "styled-components";

const InfoContainer = styled.div`
  font-size: 14px;
  color: #666;
`;

const NoticeInfo = ({ notice }) => (
  <InfoContainer>
    <Title>{notice.noticeTitle}</Title>
    <Writer>User: {notice.noticeWriter}</Writer>
    <CreatedAt>{notice.noticeCreatedAt}</CreatedAt>
    <Content>{notice.noticeContent}</Content>
  </InfoContainer>
);

export default NoticeInfo;
