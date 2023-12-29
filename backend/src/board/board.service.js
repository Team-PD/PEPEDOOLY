const boardRepository = require("./board.repository");
const db = require("../lib/db.js");
const Likes = db.Likes;
const Boards = db.Boards;

const getBoardList = async () => {
  return await boardRepository.getBoardList();
};

const createBoard = async (boardData) => {
  return await boardRepository.createBoard(boardData);
};

const getBoardById = async (id) => {
  const board = await boardRepository.getBoardById(id);
  if (!board) return null;

  // 추천수 계산
  const recommendCount = await Likes.count({
    where: {
      Boards_id: id,
      isDislike: false,
    },
  });

  // 비추천수 계산
  const nonRecommendCount = await Likes.count({
    where: {
      Boards_id: id,
      isDislike: true,
    },
  });

  board.Boards_views++;
  await board.save();

  return {
    ...board.dataValues, // 기존 게시글 정보
    recommendCount,
    nonRecommendCount,
  };
};

const updateBoard = async (id, boardData) => {
  return await boardRepository.updateBoard(id, boardData);
};

const deleteBoard = async (id) => {
  return await boardRepository.deleteBoard(id);
};

// 추천 및 비추천 수 가져오기
const getLikeDislikeCounts = async (boardId) => {
  const recommendCount = await Likes.count({
    where: { Boards_id: boardId, isDislike: false },
  });
  const nonRecommendCount = await Likes.count({
    where: { Boards_id: boardId, isDislike: true },
  });
  return { recommendCount, nonRecommendCount };
};

// ===== 내가 쓴 글 API =====
const getBoardsByUserId = async (userId) => {
  return await Boards.findAll({
    where: { Users_id: userId },
    // 기타 필요한 include 및 정렬 옵션
  });
};

module.exports = {
  createBoard,
  getBoardList,
  getBoardById,
  updateBoard,
  deleteBoard,
  getLikeDislikeCounts,
  getBoardsByUserId,
};
