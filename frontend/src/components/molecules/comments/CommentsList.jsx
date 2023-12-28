import React, { useState } from "react";
import axios from "axios";
import CommentsView from "../../atoms/comments/CommentsView";
import CommentsBtn from "../../atoms/comments/CommentsBtn";
import CommentsForm from "./CommentsForm";
import styles from "./CommentsList.module.css";

export default function CommentsList({
    comments,
    onDeleteComment,
    onEditComment,
    editingCommentId,
    setEditingCommentId,
    user,
    onAddReply,
    token,
    setComments,
}) {
    const [showReplyForm, setShowReplyForm] = useState(null);
    // const [editingReplyId, setEditingReplyId] = useState(null);

    // // 대댓글 수정 시작
    // const startEditingReply = (replyId) => {
    //     setEditingReplyId(replyId);
    // };

    // 대댓글 삭제
    const handleDeleteReply = async (replyId) => {
        try {
            await axios.delete(`http://localhost:4000/comments/${replyId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // 대댓글 삭제 후 상태 업데이트 로직
            setComments(
                comments.map((comment) => ({
                    ...comment,
                    Replies: comment.Replies.filter((reply) => reply.Comments_uid !== replyId),
                }))
            );
        } catch (error) {
            console.error("대댓글 삭제 실패", error);
        }
    };

    // const handleEditReply = async (replyId, newContent) => {
    //     await onEditComment(replyId, newContent);
    //     setEditingReplyId(null); // 수정 후 상태 초기화
    // };

    return (
        <div className={styles.commentsList}>
            {comments.map((comment) => (
                <div key={comment.Comments_uid} className={styles.commentItem}>
                    {/* 댓글 내용 또는 폼 */}
                    {editingCommentId === comment.Comments_uid ? (
                        <CommentsForm
                            value={comment.Comments_content}
                            onAddComment={(newContent) => {
                                onEditComment(comment.Comments_uid, newContent);
                                setEditingCommentId(null);
                            }}
                        />
                    ) : (
                        <CommentsView content={comment.Comments_content} author={comment.UserNickname} />
                    )}

                    {/* 댓글 조작 버튼 */}
                    {user?.userData?.Users_id === comment.Users_uid && (
                        <div className={styles.commentActions}>
                            {editingCommentId !== comment.Comments_uid && (
                                <CommentsBtn text="수정" onClick={() => setEditingCommentId(comment.Comments_uid)} />
                            )}
                            <CommentsBtn text="삭제" onClick={() => onDeleteComment(comment.Comments_uid)} />
                        </div>
                    )}

                    {/* 답글 달기 버튼 */}
                    {user && (
                        <div className={styles.replyToggle}>
                            <button
                                className={styles.replyBtn}
                                onClick={() =>
                                    setShowReplyForm(
                                        showReplyForm === comment.Comments_uid ? null : comment.Comments_uid
                                    )
                                }
                            >
                                답글 달기
                            </button>
                        </div>
                    )}

                    {/* 대댓글 폼 */}
                    {showReplyForm === comment.Comments_uid && (
                        <div className={styles.replyForm}>
                            <CommentsForm
                                onAddComment={(replyContent) => {
                                    onAddReply(replyContent, comment.Comments_uid);
                                    setShowReplyForm(null);
                                }}
                            />
                        </div>
                    )}

                    {/* 대댓글 목록 */}
                    {comment.Replies &&
                        comment.Replies.map((reply) => (
                            <div key={reply.Comments_uid} className={styles.replyItem}>
                                {editingCommentId === reply.Comments_uid ? (
                                    <CommentsForm
                                        value={reply.Comments_content}
                                        onAddComment={(newContent) => {
                                            onEditComment(reply.Comments_uid, newContent);
                                            setEditingCommentId(null); // 수정 후 상태 초기화
                                        }}
                                    />
                                ) : (
                                    <CommentsView content={reply.Comments_content} author={reply.UserNickname} />
                                )}

                                {/* 대댓글 조작 버튼 */}
                                {user?.userData?.Users_id === reply.Users_uid && (
                                    <div className={styles.replyActions}>
                                        <button onClick={() => setEditingCommentId(reply.Comments_uid)}>수정</button>
                                        <button onClick={() => handleDeleteReply(reply.Comments_uid)}>삭제</button>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
