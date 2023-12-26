import React from "react";
import styles from "./CommentsInput.module.css";

export default function CommentsInput({ value, onChange, placeholder }) {
    return (
        <input
            className={styles.commentInput}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}
