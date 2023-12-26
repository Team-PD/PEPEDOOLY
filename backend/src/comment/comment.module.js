const CommentService = require("./comment.service");
const CommentController = require("./comment.controller");
const db = require("../lib/db");

const { Comment: Comments } = db;

const commentService = new CommentService(Comments);
const commentController = new CommentController(commentService);

console.log("Comments model:", Comments);

module.exports = {
    commentController,
};
