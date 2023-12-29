import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserState } from "../../../hooks/useUserState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
// innerModule
import styles from "./List.module.css";

export default function List() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const postsPerPage = 8;
  const navigate = useNavigate();
  const { user } = useUserState();
  // console.log("List.jsx / user : ", user);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:4000/boards");
        console.log("List.jsx / response : ", response);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (showLoginAlert) {
      setTimeout(() => setShowLoginAlert(false), 3000);
    }
  }, [showLoginAlert]);

  const totalPosts = posts.length;
  const totalPageCount = Math.ceil(totalPosts / postsPerPage);
  const pageLimit = 10;
  const maxPageGroup = Math.ceil(totalPageCount / pageLimit);
  const currentGroup = Math.ceil(currentPage / pageLimit);
  const firstPageInGroup = (currentGroup - 1) * pageLimit + 1;
  const lastPageInGroup = Math.min(
    firstPageInGroup + pageLimit - 1,
    totalPageCount
  );

  const pageNumbers = [];
  for (let i = firstPageInGroup; i <= lastPageInGroup; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevGroup = () => {
    setCurrentPage(firstPageInGroup - pageLimit);
  };

  const handleNextGroup = () => {
    setCurrentPage(firstPageInGroup + pageLimit);
  };

  const handleCreateButtonClick = () => {
    if (user.isLoggedIn) {
      navigate("/board/create");
    } else {
      setShowLoginAlert(true);
    }
  };

  return (
    <div className={styles.boardContainer}>
      <div className={`${styles.board} ${styles.animate}`}>
        <h1 className={styles.boardTitle}>Pepedooly MemeHub</h1>
        <div className={styles.posts}>
          {currentPosts.map((post) => (
            <div key={post.Boards_id} className={styles.post}>
              <Link to={`/board/view/${post.Boards_id}`}>
                {post.Images && post.Images.length > 0 ? (
                  <img
                    src={post.Images[0].Images_url} // 첫 번째 이미지 사용
                    alt="Post"
                    className={styles.postImage}
                  />
                ) : (
                  <img
                    src="https://ichef.bbci.co.uk/images/ic/640x360/p0gvfn2w.jpg" // 기본 이미지 URL
                    alt="Default"
                    className={styles.postImage}
                  />
                )}
                <h2 className={styles.title}>{post.Boards_title}</h2>
              </Link>
              <div className={styles.postInfo}>
                <p className={styles.writer}>작성자: {post.Boards_writer}</p>
                <div className={styles.PostInfosWrapper}>
                  {" "}
                  <p className={styles.likes}>
                    {" "}
                    <FontAwesomeIcon
                      className={styles.greenColor}
                      icon={faThumbsUp}
                    />
                    {post.recommendCount}
                  </p>
                  <p className={styles.likes}>
                    {" "}
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
        <nav className={styles.pagination}>
          <button
            onClick={handlePrevGroup}
            disabled={currentGroup === 1}
            className={styles.pageArrow}
          >
            &laquo;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${styles.pageNumber} ${
                currentPage === number ? styles.activePage : ""
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextGroup}
            disabled={currentGroup === maxPageGroup}
            className={styles.pageArrow}
          >
            &raquo;
          </button>
        </nav>
        <div className={styles.searchAndCreate}>
          {/* 검색 기능 구현 예정 */}
          <button
            className={styles.createButton}
            onClick={handleCreateButtonClick}
          >
            글 작성하기
          </button>
        </div>
        {showLoginAlert && (
          <div className={styles.loginAlert}>로그인이 필요한 서비스입니다.</div>
        )}
      </div>
    </div>
  );
}
