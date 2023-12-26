import React from "react";
import styles from "./CommentsView.module.css";

export default function CommentsView({ content, author }) {
    return (
        <div className={styles.commentView}>
            <p className={styles.commentText}>
                {author}: {content}
            </p>
        </div>
    );
}
