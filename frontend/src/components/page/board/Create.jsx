import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";

export default function Create({ heading = "게시글 작성" }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/boards", {
        Boards_title: title,
        Boards_content: content,
        Users_uid: parseInt(author), // 사용자 ID를 정수로 변환
      });
      navigate(`/board/view/${response.data.Boards_id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      // 오류 메시지 출력
    }
  };

  return (
    <div className={`createForm ${styles.animate}`}>
      <h1 className={styles.heading}>{heading}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 각 입력 필드를 formGroup 대신 inputContainer로 변경 */}
        <div className={styles.inputContainer}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="author">글쓴이</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          작성하기
        </button>
      </form>
    </div>
  );
}
