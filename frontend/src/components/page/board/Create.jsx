import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../../hooks/useUserState";
import styles from "./Create.module.css";

export default function Create({ heading = "게시글 작성" }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUserState(); // 사용자 정보를 가져옵니다.
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handdleImageChange = (e) => {
    setImages([...images, ...e.target.files].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      console.error("로그인 한 유저만 게시글을 작성할 수 있습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("Boards_title", title);
    formData.append("Boards_content", content);
    formData.append("Users_id", user.userData.Users_id);
    images.forEach((image) => {
      return formData.append(`image`, image);
    });

    try {
      console.log("Create.jsx / formData  : ", formData);
      const response = await axios.post(
        "http://localhost:4000/boards",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/board/view/${response.data.Boards_id}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={`createForm ${styles.animate}`}>
      <h1 className={styles.heading}>{heading}</h1>
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
        <div className={styles.inputContainer}>
          <label htmlFor="image">이미지 첨부 (최대 5개)</label>
          <input
            type="file"
            id="image"
            multiple
            onChange={handdleImageChange}
          />
          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview ${index}`}
                  className={styles.image}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          작성하기
        </button>
      </form>
    </div>
  );
}
