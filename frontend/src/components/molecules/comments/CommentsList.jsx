import React from "react";
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
}) {
    return (
        <div className={styles.commentsList}>
            {comments.map((comment) => (
                <div key={comment.Comments_uid} className={styles.commentItem}>
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

                    {user?.userData?.Users_id === comment.Users_uid && (
                        <div className={styles.commentActions}>
                            {editingCommentId !== comment.Comments_uid && (
                                <CommentsBtn text="수정" onClick={() => setEditingCommentId(comment.Comments_uid)} />
                            )}
                            <CommentsBtn text="삭제" onClick={() => onDeleteComment(comment.Comments_uid)} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
