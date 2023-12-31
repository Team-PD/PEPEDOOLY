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
                console.log("댓글 정보:", response);
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

    const handleAddComment = async (commentContent, parentCommentId = null) => {
        try {
            if (!user || !user.isLoggedIn) {
                setShowLoginAlert(true);
                return;
            }
            const userId = user?.userData?.Users_id;

            const payload = {
                Comments_content: commentContent,
                Users_uid: userId,
                Boards_id: boardId,
            };

            let response;

            if (parentCommentId) {
                // 대댓글 추가
                response = await axios.post(`http://localhost:4000/comments/${parentCommentId}/reply`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // 대댓글 추가 후 상태 업데이트
                const newReply = {
                    ...response.data,
                    UserNickname: user?.userData?.Users_nickname,
                    Users_uid: userId,
                };

                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.Comments_uid === parentCommentId
                            ? { ...comment, Replies: [...(comment.Replies || []), newReply] }
                            : comment
                    )
                );
            } else {
                // 일반 댓글 추가
                response = await axios.post("http://localhost:4000/comments", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const newComment = {
                    ...response.data,
                    UserNickname: user?.userData?.Users_nickname,
                    Users_uid: userId,
                };

                setComments((prevComments) => [...prevComments, newComment]);
            }
        } catch (error) {
            console.error("댓글 추가하기 실패", error);
        }
    };

    const handleAddReply = async (replyContent, parentCommentId) => {
        try {
            if (!user || !user.isLoggedIn) {
                setShowLoginAlert(true);
                return;
            }
            const userId = user?.userData?.Users_id;

            const payload = {
                Comments_content: replyContent,
                Users_uid: userId,
                Boards_id: boardId, // 혹은 parentCommentId에 해당하는 Board ID
            };

            // 대댓글 추가 API 요청
            const response = await axios.post(`http://localhost:4000/comments/${parentCommentId}/reply`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 대댓글 추가 후 상태 업데이트
            const newReply = {
                ...response.data,
                UserNickname: user?.userData?.Users_nickname,
                Users_uid: userId,
            };

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.Comments_uid === parentCommentId
                        ? { ...comment, Replies: [...(comment.Replies || []), newReply] }
                        : comment
                )
            );
        } catch (error) {
            console.error("대댓글 추가 실패", error);
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
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setComments(
                comments.map((comment) => {
                    if (comment.Comments_uid === commentId) {
                        // 일반 댓글 수정
                        return { ...comment, Comments_content: newContent };
                    } else if (comment.Replies.some((reply) => reply.Comments_uid === commentId)) {
                        // 대댓글 수정
                        return {
                            ...comment,
                            Replies: comment.Replies.map((reply) =>
                                reply.Comments_uid === commentId ? { ...reply, Comments_content: newContent } : reply
                            ),
                        };
                    } else {
                        return comment;
                    }
                })
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
                onAddReply={handleAddReply}
                token={token}
                setComments={setComments}
            />
        </section>
    );
}
