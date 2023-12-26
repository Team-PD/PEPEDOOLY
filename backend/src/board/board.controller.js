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

// board.controller.js

// updateBoard 함수 수정
const updateBoard = async (req, res) => {
  try {
    const id = req.params.id;
    const { Boards_title, Boards_content, existingImages } = req.body;

    // 게시글 내용 업데이트
    await db.Boards.update(
      { Boards_title, Boards_content },
      { where: { Boards_id: id } }
    );

    // 새로운 이미지 처리
    if (req.files && req.files.length > 0) {
      const newImagesData = req.files.map((file) => ({
        Boards_id: id,
        Images_url: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
      }));
      await db.Images.bulkCreate(newImagesData);
    }

    // 기존 이미지 처리 (예시: 기존 이미지 ID를 클라이언트에서 전달받은 경우)
    if (existingImages) {
      const existingImagesIds = existingImages.split(",").map(Number);
      await db.Images.destroy({
        where: { Images_id: { [Op.notIn]: existingImagesIds }, Boards_id: id },
      });
    }

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

// ===== 추천 및 비추천 로직 =====
const addLike = async (req, res) => {
  const { Boards_id, Users_id, isDislike } = req.body;

  try {
    const existingLike = await Likes.findOne({
      where: { Boards_id, Users_id },
    });

    if (existingLike) {
      if (existingLike.isDislike === isDislike) {
        const message = isDislike
          ? "이미 비추천을 한 게시물입니다."
          : "이미 추천을 한 게시물입니다.";
        return res.status(409).json({ message });
      }

      // 추천/비추천 전환 로직
      existingLike.isDislike = isDislike;
      await existingLike.save();
      return res.status(200).json({ updated: true, isDislike });
    }

    const like = await Likes.create({ Boards_id, Users_id, isDislike });
    res.status(201).json({ updated: false });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getLikeDislikeCounts = async (req, res) => {
  try {
    const { id } = req.params;
    const counts = await boardService.getLikeDislikeCounts(id);
    res.json(counts);
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
  getLikeDislikeCounts,
};
