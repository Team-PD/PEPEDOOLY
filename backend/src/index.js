const express = require("express");
const router = express.Router();
const userRouter = require("./user/user.router");
const adminRouter = require("./admin/admin.router");
const boardRouter = require("./board/board.router");
const commentRouter = require("./comment/comment.router");
// const chatRouter = require("./chat/chat.router");
const noticeRouter = require("./notice/notice.router");

router.use("/admin", adminRouter);
router.use("/notice", noticeRouter);
router.use("/users", userRouter);
router.use("/boards", boardRouter);
router.use("/comments", commentRouter);

// router.use("/chat", chatRouter);

module.exports = router;
