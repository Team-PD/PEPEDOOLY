import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faHandcuffs } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
// innerModule
import styles from "./View.module.css";
import { useUserState } from "../../../hooks/useUserState";
import Comments from "../../organisms/comments/Comments";

const View = () => {
    const [board, setBoard] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserState();

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/boards/${id}`);
                console.log("view.jsx data : ", data);
                setBoard(data); // 서버로부터 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching the board:", error);
            }
        };

        fetchBoard();
    }, [id]);

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("ko-KR", options);
    };

    //
    //
    // 추천, 비추천, 신고 버튼
    const handleLikeButtonClick = async () => {
        if (!user.isLoggedIn) {
            console.error("로그인 한 유저만 추천할 수 있습니다.");
            return;
        }

        try {
            const { Users_id } = user.userData;
            await axios.post(`http://localhost:4000/boards/${id}/like`, {
                Boards_id: id,
                Users_id,
            });
            // 상태 업데이트로 UI에 반영
            setBoard((prevState) => ({
                ...prevState,
                recommendCount: prevState.recommendCount + 1,
            }));
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };

    const handleDislikeButtonClick = async () => {
        if (!user.isLoggedIn) {
            console.error("로그인 한 유저만 비추천할 수 있습니다.");
            return;
        }

        try {
            const { Users_id } = user.userData;
            await axios.post(`http://localhost:4000/boards/${id}/dislike`, {
                // API 경로 및 요청 본문은 서버 구현에 맞게 조정
                Boards_id: id,
                Users_id,
                isDislike: true, // 비추천 표시
            });
            // 상태 업데이트로 UI에 반영
            setBoard((prevState) => ({
                ...prevState,
                nonRecommendCount: prevState.nonRecommendCount + 1, // 비추천 수 업데이트
            }));
        } catch (error) {
            console.error("Error disliking the post:", error);
        }
    };

    //
    //
    //
    // 수정, 삭제, 목록 버튼
    const handleUpdateButtonClick = () => {
        navigate(`/board/modify/${id}`); // 수정 페이지로 이동
    };
    const handleDeleteButtonClick = async () => {
        try {
            await axios.delete(`http://localhost:4000/boards/${id}`);
            navigate("/board");
        } catch (error) {
            console.error("Board View.jsx, Delete Error : ", error);
        }
    };
    const handleListButtonClick = () => {
        navigate("/board");
    };
    if (!board) return <div className={styles.loading}>Loading...</div>;

    //
    //
    //
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{board.Boards_title}</h1>
                <div className={styles.info}>
                    <span className={styles.userId}>작성자 : {board.Users.Users_nickname}</span>
                    <span>조회수 : {board.Boards_views}</span>
                    <span className={styles.createdAt}>{formatDate(board.Boards_created_at)}</span>
                </div>
            </div>
            <div className={styles.imageContainer}>
                {board.Images &&
                    board.Images.map((image, index) => (
                        <img key={index} src={image.Images_url} alt={`Image ${index}`} className={styles.postImage} />
                    ))}
            </div>
            <p className={styles.content}>{board.Boards_content}</p>
            <div className={styles.footer}>
                <button className={`${styles.button} ${styles.recommendButton}`} onClick={handleLikeButtonClick}>
                    <FontAwesomeIcon className={styles.greenColor} icon={faThumbsUp} />
                    추천 {board.recommendCount}
                </button>
                <button className={`${styles.button} ${styles.nonRecommendButton}`} onClick={handleDislikeButtonClick}>
                    <FontAwesomeIcon className={styles.redColor} icon={faThumbsDown} />
                    비추천 {board.nonRecommendCount}
                </button>
                <button className={`${styles.button} ${styles.reportButton}`}>
                    <FontAwesomeIcon className={styles.yellowColor} icon={faHandcuffs} />
                    신고
                </button>
            </div>
            <div className={styles.buttonGroup}>
                <button onClick={handleUpdateButtonClick}>글 수정</button>
                <button onClick={handleDeleteButtonClick}>글 삭제</button>
                <button onClick={handleListButtonClick}>목록으로</button>
            </div>
            <div className={styles.commentsContainer}>
                <Comments boardId={id} user={user} />
            </div>
        </div>
    );
};

export default View;
