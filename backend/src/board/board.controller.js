const boardService = require("./board.service");
const db = require("../lib/db.js");
const Likes = db.Likes;
const Images = db.Images;

const getBoardList = async (req, res) => {
  try {
    const boards = await boardService.getBoardList();
    res.json(boards);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createBoard = async (req, res) => {
  try {
    const board = await boardService.createBoard(req.body);

    if (req.files) {
      const imagesData = req.files.map((file) => ({
        Boards_id: board.Boards_id,
        Images_url: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`, // 파일 URL 생성
      }));
      await db.Images.bulkCreate(imagesData);
    }

    res.status(201).json(board);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBoard = async (req, res) => {
  try {
    const board = await boardService.getBoardById(req.params.id);
    if (!board) {
      return res.status(404).send("Board not found");
    }
    res.json(board);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateBoard = async (req, res) => {
  try {
    await boardService.updateBoard(req.params.id, req.body);
    res.send("Board updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBoard = async (req, res) => {
  try {
    await boardService.deleteBoard(req.params.id);
    res.send("Board deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 좋아요 로직
const addLike = async (req, res) => {
  const { Boards_id, Users_id, isDislike } = req.body; // isDislike 추가

  try {
    const existingLike = await Likes.findOne({
      where: { Boards_id, Users_id },
    });

    if (existingLike) {
      return res.status(409).send("You already reacted to this post.");
    }

    const like = await Likes.create({ Boards_id, Users_id, isDislike });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getBoardList,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  addLike,
};
