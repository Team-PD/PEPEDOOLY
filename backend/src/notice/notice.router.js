const express = require("express");
const noticeRouter = express.Router();
const { noticeController } = require("./notice.module");
const upload = require("../lib/upload");

const postNotice = noticeController.postNotice.bind(noticeController);
const getAllNotice = noticeController.getAllNotice.bind(noticeController);
const getNotice = noticeController.getNotice.bind(noticeController);
const putNotice = noticeController.putNotice.bind(noticeController);
const deleteNotice = noticeController.deleteNotice.bind(noticeController);

noticeRouter.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = "/uploads/" + req.file.filename;
  res.json({ success: true, imageUrl });
});
noticeRouter.post("/create", upload.any(), postNotice);
noticeRouter.get("/", getAllNotice);
noticeRouter.get("/:id", getNotice);
noticeRouter.put("/edit/:id", putNotice);
noticeRouter.delete("/:id", deleteNotice);

module.exports = noticeRouter;
