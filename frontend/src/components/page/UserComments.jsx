import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserState } from "../../hooks/useUserState";
import styles from "./UserComments.module.css"; // 스타일링에 필요한 CSS 모듈

export default function UserComments() {
    const [comments, setComments] = useState([]);
    const { user } = useUserState();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/comments/user/${user.userData.Users_id}`) // 사용자가 작성한 댓글을 가져오는 API 경로
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => console.error("Error fetching user comments:", error));
    }, [user.userData.Users_id]);

    return (
        <div className={styles.commentsContainer}>
            <h1 className={styles.title}>내가 쓴 댓글</h1>
            <div className={styles.comments}>
                {comments.map((comment) => (
                    <div key={comment.Comments_uid} className={styles.comment}>
                        <p>{comment.Comments_content}</p>
                        {/* 추가적으로 댓글에 대한 정보를 표시할 수 있습니다. */}
                    </div>
                ))}
            </div>
        </div>
    );
}
