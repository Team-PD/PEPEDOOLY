import React, { useState } from "react";
import CommentsBtn from "../../atoms/comments/CommentsBtn";
import CommentsInput from "../../atoms/comments/CommentsInput";
import styles from "./CommentsForm.module.css";

export default function CommentsForm({ onAddComment, value }) {
    const [comment, setComment] = useState(value || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment(comment);
    };
    return (
        <form onSubmit={handleSubmit} className={styles.commentsForm}>
            <CommentsInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={"댓글을 입력하세요"}
                className={styles.commentInput}
            />
            <CommentsBtn text="댓글 추가" onClick={handleSubmit} className={styles.commentButton}></CommentsBtn>
        </form>
    );
}
