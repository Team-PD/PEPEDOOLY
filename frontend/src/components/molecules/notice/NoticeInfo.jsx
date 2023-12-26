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

const WriterContainer = styled.div`
  margin-bottom: 30px;
`;

const ContentContainer = styled.div`
  text-align: left;
`;

const NoticeInfo = ({ notice }) => (
  <InfoContainer>
    <Title>{notice.noticeTitle}</Title>
    <WriterContainer>
      <Writer>User: {notice.noticeWriter}</Writer>
      <CreatedAt>{notice.noticeCreatedAt}</CreatedAt>
    </WriterContainer>
    <ContentContainer>
      <Content>{notice.noticeContent}</Content>
    </ContentContainer>
  </InfoContainer>
);

export default NoticeInfo;
