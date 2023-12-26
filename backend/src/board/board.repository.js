const db = require("../lib/db.js");
const Board = db.Boards;
const Users = db.Users;
const Images = db.Images;
const Likes = db.Likes;

const getBoardList = async () => {
  const boards = await Board.findAll({
    include: [
      {
        model: Users,
        as: "Users",
        attributes: ["Users_id", "Users_nickname"], // 필요한 속성만 가져오기
      },
      {
        model: Images,
        as: "Images",
        limit: 1,
        attributes: ["Images_url"],
      },
      {
        model: Likes,
        as: "Likes",
        attributes: [], // 필요한 좋아요/비추천 데이터만 가져올 예정
      },
    ],
    order: [["Boards_created_at", "DESC"]],
  });

  const results = await Promise.all(
    boards.map(async (board) => {
      const boardData = board.toJSON();

      // 좋아요 수 계산
      const recommendCount = await Likes.count({
        where: {
          Boards_id: boardData.Boards_id,
          isDislike: false,
        },
      });

      // 비추천수 계산
      const nonRecommendCount = await Likes.count({
        where: {
          Boards_id: boardData.Boards_id,
          isDislike: true,
        },
      });

      return {
        ...boardData,
        Boards_writer: boardData.Users ? boardData.Users.Users_nickname : null, // 작성자 닉네임 추가
        recommendCount,
        nonRecommendCount,
      };
    })
  );

  return results;
};

const createBoard = async (boardData) => {
  return await Board.create(boardData);
};

const getBoardById = async (id) => {
  return await Board.findByPk(id, {
    include: [
      {
        model: Users,
        as: "Users",
        attributes: ["Users_nickname"],
      },
      {
        model: Images,
        as: "Images", // 모든 이미지 정보를 포함시키는 설정
        attributes: ["Images_uid", "Images_url"],
      },
    ],
  });
};

const updateBoard = async (id, boardData) => {
  return await Board.update(boardData, { where: { Boards_id: id } });
};

const deleteBoard = async (id) => {
  return await Board.destroy({ where: { Boards_id: id } });
};

module.exports = {
  createBoard,
  getBoardList,
  getBoardById,
  updateBoard,
  deleteBoard,
};
