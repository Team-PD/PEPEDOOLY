import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./View.module.css";

const View = () => {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchBoard = async () => {
      const { data } = await axios.get(`http://localhost:4000/boards/${id}`);
      // console.log(data);
      setBoard(data);
    };

    fetchBoard();
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

  if (!board) return <div>Loading...</div>;

  const handleUpdateButtonClick = () => {
    navigate(`/board/modify/${id}`); // 수정 페이지로 이동
  };
  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:4000/boards/${id}`);
      navigate("/board");
    } catch (error) {
      console.error("Board View.jsx, Delete Error : ", error);
    }
  };
  const handleListButtonClick = () => {
    navigate("/board");
  };
  if (!board) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{board.title}</h1>
        <div className={styles.info}>
          <span className={styles.userId}>User: {board.userId}</span>
          <span>조회수: {board.views}</span>
          <span className={styles.createdAt}>
            {formatDate(board.createdAt)}
          </span>
        </div>
      </div>
      <p className={styles.content}>{board.content}</p>
      <div className={styles.footer}>
        <span>추천: {board.recommendCount}</span>
        <span>비추천: {board.nonRecommendCount}</span>
        <span>댓글: {board.commentCount}</span>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleUpdateButtonClick}>글 수정</button>
        <button onClick={handleDeleteButtonClick}>글 삭제</button>
        <button onClick={handleListButtonClick}>목록으로</button>
      </div>
    </div>
  );
};

export default View;
