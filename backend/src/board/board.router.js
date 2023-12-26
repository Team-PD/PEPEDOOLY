const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const boardController = require("./board.controller");

const storage = multer.diskStorage({
  destination: "uploads/", // 파일 저장 경로
  filename: function (req, file, callback) {
    // 파일명을 결정하는 함수
    const ext = path.extname(file.originalname); // 원본 파일의 확장자
    const uniqueSuffix = crypto.randomBytes(18).toString("hex"); // 고유 식별자 생성
    callback(null, `${uniqueSuffix}${ext}`); // 고유 식별자와 확장자를 조합한 파일명
  },
});
const upload = multer({ storage: storage });

router.get("/", boardController.getBoardList);
router.post("/", upload.array("image", 5), boardController.createBoard);
router.get("/:id", boardController.getBoard);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);
// router.get("/:id/likes", boardController.getLikes);
router.post("/:id/like", boardController.addLike);
// router.delete("/:id/like", boardController.removeLike);

module.exports = router;
