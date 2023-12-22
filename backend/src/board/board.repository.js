const db = require("../lib/db.js");
const Board = db.Boards;
const Users = db.Users;
const Images = db.Images;

const getBoardList = async () => {
  return await Board.findAll({
    include: [
      {
        model: Images,
        as: "Images",
        limit: 1,
        attributes: ["Images_url"],
      },
    ],
    order: [["Boards_created_at", "DESC"]],
  });
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
