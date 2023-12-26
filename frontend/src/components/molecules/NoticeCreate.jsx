import { useUserState } from "../../hooks/useUserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Create } from "./SampleCreate";
import { styleProps } from "../atoms/BoardNoticeStyleProps";

export const NoticeCreate = (props) => {
  const { user } = useUserState();
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content, image }) => {
    const { Admin_id, Admin_nickname } = user.userData;
    let imageUrl = "";

    try {
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        const imageResponse = await axios.post(
          "http://localhost:4000/notice/image",
          imageFormData,
          { withCredentials: true }
        );
        imageUrl = imageResponse.data.imageUrl;
      }

      const response = await axios.post(
        "http://localhost:4000/notice/create",
        {
          noticeTitle: title,
          noticeContent: content,
          adminId: Admin_id,
          adminNickname: Admin_nickname,
          image: imageUrl,
        },
        { withCredentials: true }
      );

      if (response.status !== 201) {
        throw new Error("Error creating post");
      }
      navigate(`/notice/${response.data.noticeId}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Create
        {...props}
        onSubmit={handleSubmit}
        showAuthor={false}
        styleProps={styleProps}
      />
    </>
  );
};
