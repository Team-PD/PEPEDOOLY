import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import NoticeDetail from "../../organisms/notice/NoticeDetail";

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

  if (!notice) return <div>Loading...</div>;

  const handleUpdateButtonClick = () => {
    navigate(`/notice/edit/${id}`);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:4000/notice/${id}`, {
        data: { noticeId: id },
      });
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
      <NoticeDetail
        notice={notice}
        onEdit={handleUpdateButtonClick}
        onDelete={handleDeleteButtonClick}
        onList={handleListButtonClick}
      />
      <Footer />
    </>
  );
};

export default NoticeView;
