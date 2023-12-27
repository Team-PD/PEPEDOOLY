import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Modify.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Modify = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      const { data } = await axios.get(`http://localhost:4000/boards/${id}`);
      setTitle(data.Boards_title);
      setContent(data.Boards_content);
      if (data.Images) {
        setImages(
          data.Images.map((image) => ({ ...image, preview: image.Images_url }))
        );
      }
    };

    fetchBoard();
  }, [id]);

  const handleBack = () => {
    navigate(`/board/view/${id}`);
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newFiles].slice(0, 5));
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, idx) => idx !== index);
    const deletedImage = images[index];

    if (deletedImage && deletedImage.Images_uid) {
      setDeletedImages([...deletedImages, deletedImage.Images_uid]);
    }
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Boards_title", title);
    formData.append("Boards_content", content);

    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file); // 필드 이름 'images'
      }
    });

    if (deletedImages.length > 0) {
      formData.append("deletedImages", deletedImages.join(","));
    }

    try {
      await axios.put(`http://localhost:4000/boards/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/board/view/${id}`);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div className={`${styles.modifyForm} ${styles.animate}`}>
      <div className={styles.modifyHeader}>
        <button className={styles.backButton} onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className={styles.heading}>게시글 수정</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="image">이미지 첨부 (최대 5개)</label>
          <input
            type="file"
            id="image"
            multiple
            onChange={handleImageChange}
            className={styles.input}
          />
          <div className={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <div key={index} className={styles.imagePreview}>
                <img
                  src={image.preview ? image.preview : image}
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
          수정
        </button>
      </form>
    </div>
  );
};

export default Modify;
