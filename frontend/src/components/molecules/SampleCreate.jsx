// Create.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../atoms/BoardNoticeInputField";
import { TextAreaField } from "../atoms/BoardNoticeTextAreaField";

export const Create = ({
  heading = "게시글 작성",
  onSubmit,
  showAuthor = true,
  styleProps,
  initialValues = {},
  buttonText = "작성하기",
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, content, author, image });
  };

  return (
    <div style={styleProps.formContainer}>
      <h1 style={styleProps.heading}>{heading}</h1>
      <form onSubmit={handleSubmit} style={styleProps.form}>
        <InputField
          id="title"
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          styleProps={styleProps.inputField}
        />
        <TextAreaField
          id="content"
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          styleProps={styleProps.textAreaField}
        />
        {showAuthor && (
          <InputField
            id="author"
            label="글쓴이"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            styleProps={styleProps.inputField}
          />
        )}
        <input type="file" onChange={handleImageChange} />
        <button type="submit" style={styleProps.submitButton}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};
