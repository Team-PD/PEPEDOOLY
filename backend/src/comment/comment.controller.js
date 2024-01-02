const { CommentCreateRequestDTO } = require("./dto/comment.create.request.dto");

class CommentController {
    constructor(service) {
        this.service = service;
    }

    async postComment(req, res, next) {
        try {
            console.log("1");
            const commentCreateRequestDTO = new CommentCreateRequestDTO(req);
            console.log("2");
            const result = await this.service.createComment(commentCreateRequestDTO);
            console.log("3");
            console.log(result);
            return res.status(201).json(result);
        } catch (e) {
            next(new Error("Invalid request"));
        }
    }

    async getComments(req, res, next) {
        try {
            const boardId = req.params.boardId;
            const comments = await this.service.getServiceComments(boardId);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const updateData = req.body;
            const updatedComment = await this.service.updateComment(commentId, updateData);
            return res.status(200).json(updatedComment);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { commentId } = req.params;
            await this.service.deleteComment(commentId);
            return res.status(204).send();
        } catch (e) {
            next(e);
        }
    }

    async getUserComments(req, res, next) {
        try {
            const userId = req.params.userId;
            const comments = await this.service.getUserComments(userId);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = CommentController;
