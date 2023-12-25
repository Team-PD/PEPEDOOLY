import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const NoticeView = () => {
  const [notice, setNotice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      const { data } = await axios.get(`http://localhost:4000/notice/${id}`);
      setNotice({ ...data });
    };

    fetchNotice();
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  if (!notice) return <div>Loading...</div>;

  const handleUpdateButtonClick = () => {
    navigate(`/notice/edit/${id}`);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:4000/notice/${id}`);
      navigate("/notice");
    } catch (error) {
      console.error("Notice View.jsx, Delete Error : ", error);
    }
  };

  const handleListButtonClick = () => {
    navigate("/notice");
  };

  return (
    <>
      <Header />
      <Container>
        <Title>{notice.noticeTitle}</Title>
        <Info>
          <UserId>User: {notice.noticeWriter}</UserId>
          <CreatedAt>{formatDate(notice.noticeCreatedAt)}</CreatedAt>
        </Info>
        <Content>{notice.noticeContent}</Content>
        <ButtonGroup>
          <Button onClick={handleUpdateButtonClick}>글 수정</Button>
          <Button onClick={handleDeleteButtonClick}>글 삭제</Button>
          <Button onClick={handleListButtonClick}>목록으로</Button>
        </ButtonGroup>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: #666;
`;

const UserId = styled.span`
  margin-right: 10px;
`;

const CreatedAt = styled.span`
  margin-left: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
`;

const ButtonGroup = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default NoticeView;
