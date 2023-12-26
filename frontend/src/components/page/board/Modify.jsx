import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Modify.module.css";

const Modify = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 이미지 상태 추가
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      const { data } = await axios.get(`http://localhost:4000/boards/${id}`);
      console.log("Modify.jsx / data : ", data);
      setTitle(data.Boards_title);
      setContent(data.Boards_content);
      // 이미지 상태 설정 로직 추가
      if (data.Images) {
        setImages(data.Images.map((image) => image.Images_url));
      }
    };

    fetchBoard();
  }, [id]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newFiles].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Boards_title", title);
    formData.append("Boards_content", content);

    // 새 이미지만 FormData에 추가
    images.forEach((image) => {
      if (image.file) {
        formData.append("image", image.file);
      }
    });

    // 기존 이미지의 ID를 추가 (예시)
    const existingImagesIds = images
      .filter((img) => !img.file)
      .map((img) => img.id)
      .join(",");
    formData.append("existingImages", existingImagesIds);

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
    <div className={styles.container}>
      <h1>글 수정</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentInput}
        />
        <input type="file" multiple onChange={handleImageChange} />
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
        <button type="submit" className={styles.submitButton}>
          수정
        </button>
      </form>
    </div>
  );
};

export default Modify;
