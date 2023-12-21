import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../../hooks/useUserState"; // 올바른 경로로 수정
import styles from "./Create.module.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUserState(); // 사용자 정보를 가져옵니다.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      // 로그인하지 않은 경우 처리
      console.error("로그인 한 유저만 게시글을 작성할 수 있습니다.");
      return;
    }

    try {
      console.log(
        "Create.jsx / user.userData.Users_id  : ",
        user.userData.Users_id
      );
      const response = await axios.post("http://localhost:4000/boards", {
        Boards_title: title,
        Boards_content: content,
        Users_id: user.userData.Users_id, // 사용자 ID 할당
      });
      navigate(`/board/view/${response.data.Boards_id}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={`createForm ${styles.animate}`}>
      <h1 className={styles.heading}>게시글 작성</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        {/* 사용자 입력을 통한 글쓴이 필드는 더 이상 필요하지 않으므로 제거합니다. */}
        <button type="submit" className={styles.submitButton}>
          작성하기
        </button>
      </form>
    </div>
  );
}
