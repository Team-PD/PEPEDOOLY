const express = require("express");
const commentRouter = express.Router();

const { commentController } = require("./comment.module");
const getComments = commentController.getComments.bind(commentController);
const postComment = commentController.postComment.bind(commentController);
const updateComment = commentController.updateComment.bind(commentController);
const deleteComment = commentController.deleteComment.bind(commentController);

commentRouter.get("/:boardId", getComments);
commentRouter.post("/", postComment);
commentRouter.put("/:commentId", updateComment);
commentRouter.delete("/:commentId", deleteComment);

commentRouter.get("/user/:userId", (req, res, next) => {
    commentController.getUserComments(req, res, next);
});

commentRouter.post("/:commentId/reply", (req, res, next) => {
    req.body.ParentCommentId = req.params.commentId;
    postComment(req, res, next);
});

module.exports = commentRouter;
