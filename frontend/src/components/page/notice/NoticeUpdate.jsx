import React, { useEffect, useState } from "react";
import { useUserState } from "../../../hooks/useUserState";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Create } from "../../molecules/SampleCreate";
import { styleProps } from "../../atoms/BoardNoticeStyleProps";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

export const NoticeUpdate = (props) => {
  const { user } = useUserState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      const { data } = await axios.get(`http://localhost:4000/notice/${id}`);
      setNotice({ ...data });
    };

    fetchNotice();
  }, [id]);

  const handleSubmit = async ({ title, content, image }) => {
    const { Admin_id } = user.userData;
    try {
      let imageUrl = "";
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        const imageResponse = await axios.post(
          "http://localhost:4000/notice/image",
          imageFormData,
          { withCredentials: true }
        );
        imageUrl = imageResponse.data.imageUrl;
        console.log(imageUrl);
      }

      const response = await axios.put(
        `http://localhost:4000/notice/edit/${id}`,
        {
          noticeTitle: title,
          noticeContent: content,
          adminId: Admin_id,
          noticeId: id,
          image: imageUrl,
        },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error("Error updating post");
      }
      navigate(`/notice/${response.data.noticeId}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!notice) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Create
        {...props}
        onSubmit={handleSubmit}
        showAuthor={false}
        styleProps={styleProps}
        initialValues={{
          title: notice.noticeTitle,
          content: notice.noticeContent,
        }}
        buttonText="수정하기"
      />
      <Footer />
    </>
  );
};
