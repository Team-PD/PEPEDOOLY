import React from "react";
import styles from "./CommentsBtn.module.css";

export default function CommentsBtn({ onClick, text }) {
    return (
        <button className={styles.commentButton} type="submit" onClick={onClick}>
            {text}
        </button>
    );
}
