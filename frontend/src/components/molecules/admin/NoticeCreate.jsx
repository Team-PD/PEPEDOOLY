import React, { useState } from "react";
import { useUserState } from "../../../hooks/useUserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Create } from "../SampleCreate";
import { styleProps } from "../../atoms/BoardNoticeStyleProps";

export const NoticeCreate = (props) => {
  const { user } = useUserState();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async ({ title, content }) => {
    const { Admin_id, Admin_nickname } = user.userData;

    const formData = new FormData();
    formData.append("noticeTitle", title);
    formData.append("noticeContent", content);
    formData.append("adminId", Admin_id);
    formData.append("adminNickname", Admin_nickname);
    images.forEach((image) => {
      return formData.append(`image`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/notice/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status !== 201) {
        throw new Error("Error creating post");
      }
      navigate(`/notice/${response.data.noticeId}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Create
      {...props}
      onSubmit={handleSubmit}
      showAuthor={false}
      styleProps={styleProps}
      handleImageChange={handleImageChange}
      removeImage={removeImage}
      images={images}
    />
  );
};
