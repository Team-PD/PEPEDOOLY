import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserState } from "../../hooks/useUserState";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserPosts.module.css";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const { user } = useUserState();
  console.log("UserPosts.jsx / user : ", user);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/boards/user/${user.userData.Users_id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching user posts:", error));
  }, [user.userData.Users_id]);

  return (
    <div className={styles.boardContainer}>
      <div className={`${styles.board} ${styles.animate}`}>
        <h1 className={styles.boardTitle}>내가 쓴 글</h1>
        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post.Boards_id} className={styles.post}>
              <Link to={`/board/view/${post.Boards_id}`}>
                {post.Images && post.Images.length > 0 ? (
                  <img
                    src={post.Images[0].Images_url}
                    alt="Post"
                    className={styles.postImage}
                  />
                ) : (
                  <img
                    src="https://ichef.bbci.co.uk/images/ic/640x360/p0gvfn2w.jpg"
                    alt="Default"
                    className={styles.postImage}
                  />
                )}
                <h2 className={styles.title}>{post.Boards_title}</h2>
              </Link>
              <div className={styles.postInfo}>
                <p className={styles.writer}>작성자: {post.Boards_writer}</p>
                <div className={styles.PostInfosWrapper}>
                  <p className={styles.likes}>
                    <FontAwesomeIcon
                      className={styles.greenColor}
                      icon={faThumbsUp}
                    />
                    {post.recommendCount}
                  </p>
                  <p className={styles.dislikes}>
                    <FontAwesomeIcon
                      className={styles.redColor}
                      icon={faThumbsDown}
                    />
                    {post.nonRecommendCount}
                  </p>
                  <p className={styles.views}>
                    <FontAwesomeIcon
                      className={styles.yellowColor}
                      icon={faEye}
                    />
                    {post.Boards_views}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
