const express = require("express");
const noticeRouter = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { noticeController } = require("./notice.module");

const postNotice = noticeController.postNotice.bind(noticeController);
const getAllNotice = noticeController.getAllNotice.bind(noticeController);
const getNotice = noticeController.getNotice.bind(noticeController);
const putNotice = noticeController.putNotice.bind(noticeController);
const deleteNotice = noticeController.deleteNotice.bind(noticeController);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = crypto.randomBytes(18).toString("hex");
    callback(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage: storage });

noticeRouter.post("/create", upload.array("image", 5), postNotice);
noticeRouter.get("/", getAllNotice);
noticeRouter.get("/:id", getNotice);
noticeRouter.put("/edit/:id", putNotice);
noticeRouter.delete("/:id", deleteNotice);

module.exports = noticeRouter;
