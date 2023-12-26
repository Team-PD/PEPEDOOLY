import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentsForm from "../../molecules/comments/CommentsForm";
import CommentsList from "../../molecules/comments/CommentsList";
import styles from "./Comments.module.css";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
};

// const sampleComments = [
//     { id: 1, content: "이것은 첫 번째 댓글입니다.", author: "홍길동" },
//     { id: 2, content: "두 번째 댓글이에요.", author: "김철수" },
//     { id: 3, content: "React는 재미있어요!", author: "이영희" },
// ];

export default function Comments({ boardId, user }) {
    const [comments, setComments] = useState([]);
    const [token] = useState(getCookie("token"));
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        // setComments(sampleComments);
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/comments/${boardId}`);
                setComments(response.data);
                console.log(response);
            } catch (error) {
                console.error("댓글 불러오기 실패", error);
            }
        };

        fetchComments();
    }, [boardId]);

    useEffect(() => {
        if (showLoginAlert) {
            setTimeout(() => setShowLoginAlert(false), 3000);
        }
    }, [showLoginAlert]);

    const handleAddComment = async (commentContent) => {
        try {
            if (!user || !user.isLoggedIn) {
                setShowLoginAlert(true);
                return;
            }
            const userId = user?.userData?.Users_id;

            const response = await axios.post(
                "http://localhost:4000/comments",
                {
                    Comments_content: commentContent,
                    Users_uid: userId,
                    Boards_id: boardId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newComment = {
                ...response.data,
                UserNickname: user?.userData?.Users_nickname,
                Users_uid: userId,
            };

            setComments((comments) => [...comments, newComment]);

            // setComments([...comments, response.data]);
        } catch (error) {
            console.error("댓글 추가하기 실패", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:4000/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComments(comments.filter((comment) => comment.Comments_uid !== commentId));
        } catch (error) {
            console.error("댓글 지우기 실패", error);
        }
    };

    const handleEditComment = async (commentId, newContent) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/comments/${commentId}`,
                { Comments_content: newContent },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setComments(
                comments.map((comment) =>
                    comment.Comments_uid === commentId ? { ...comment, Comments_content: newContent } : comment
                )
            );
        } catch (error) {
            console.error("댓글 수정 실패", error);
        }
    };

    return (
        <section className={styles.commentsSection}>
            {showLoginAlert && <div className={styles.loginAlert}>로그인이 필요한 서비스입니다.</div>}
            <CommentsForm onAddComment={handleAddComment} />
            <CommentsList
                comments={comments}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
                editingCommentId={editingCommentId}
                setEditingCommentId={setEditingCommentId}
                user={user}
            />
        </section>
    );
}
