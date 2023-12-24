import { useUserState } from "../../../hooks/useUserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Create } from "./SampleCreate";
import { styleProps } from "../../atoms/BoardNoticeStyleProps";

export const Notice = (props) => {
  const { user } = useUserState();
  const navigate = useNavigate();

  const handleSubmit = async ({ title, content }) => {
    try {
      const formData = new FormData();
      formData.append("noticeTitle", title);
      formData.append("Notice_content", content);

      const response = await axios.post(
        "http://localhost:4000/notice/create",
        formData, // FormData 객체를 전송
        { withCredentials: true }
      );
      navigate(`/notice/view/${response.data.Notice_id}`);
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
