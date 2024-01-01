const { CommentViewResponseDTO } = require("./dto/comment.view.response.dto");
const db = require("../lib/db");
const { CommentResponseDTO } = require("./dto/comment.response.dto");

class CommentService {
    constructor(Comment) {
        this.commentRepository = Comment;
    }

    async createComment(requestDTO) {
        try {
            const comment = await this.commentRepository.create({
                Comments_content: requestDTO.Comments_content,
                Users_uid: requestDTO.Users_uid,
                Boards_id: requestDTO.Boards_id,
                ParentCommentId: requestDTO.ParentCommentId,
            });

            const fullComment = await this.commentRepository.findByPk(comment.Comments_uid, {
                include: [{ model: db.Users, as: "CommentUser" }],
            });

            return new CommentResponseDTO(fullComment);
        } catch (e) {
            throw e;
        }
    }

    async getServiceComments(boardId) {
        try {
            const comments = await this.commentRepository.findAll({
                include: [
                    {
                        model: db.Users,
                        attributes: ["Users_nickname"],
                        as: "CommentUser",
                    },
                    {
                        model: this.commentRepository,
                        as: "Replies",
                        include: [
                            {
                                model: db.Users,
                                attributes: ["Users_nickname"],
                                as: "ReplyUser",
                            },
                        ],
                    },
                ],
                where: {
                    Boards_id: boardId,
                    ParentCommentId: null, // 대댓글이 아닌 메인 댓글만 조회
                },
                order: [["Comments_created_at", "DESC"]],
            });

            return comments.map((comment) => new CommentViewResponseDTO(comment));
        } catch (e) {
            throw e;
        }
    }

    async updateComment(commentId, updateData) {
        const comment = await this.commentRepository.findByPk(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }

        await comment.update(updateData);
        return comment;
    }

    async deleteComment(commentId) {
        const comment = await this.commentRepository.findByPk(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }

        await comment.destroy();
    }

    async getUserComments(userId) {
        try {
            const comments = await this.commentRepository.findAll({
                where: { Users_uid: userId },
                include: [
                    // 필요한 연관 관계 포함
                ],
                order: [["Comments_created_at", "DESC"]],
            });

            return comments.map((comment) => new CommentViewResponseDTO(comment));
        } catch (e) {
            throw e;
        }
    }
}

module.exports = CommentService;
