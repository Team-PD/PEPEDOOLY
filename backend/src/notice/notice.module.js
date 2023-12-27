const NoticeService = require("./notice.service");
const NoticeController = require("./notice.controller");

const db = require("../lib/db");
const { Notice, Images } = db;
const noticeService = new NoticeService(Notice, Images);
const noticeController = new NoticeController(noticeService, Images);

module.exports = { noticeController };
