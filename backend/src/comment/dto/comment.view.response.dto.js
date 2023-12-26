const BaseDTO = require("../../lib/base.dto");

class CommentViewResponseDTO extends BaseDTO {
    Comments_uid;
    Comments_content;
    Comments_created_at;
    Boards_id;
    Users_uid;
    UserNickname;
    UserProfile;
    Replies = [];

    constructor(comment) {
        super();

        this.Comments_uid = comment.Comments_uid;
        this.Comments_content = comment.Comments_content;
        this.Comments_created_at = comment.Comments_created_at;
        this.Boards_id = comment.Boards_id;
        this.Users_uid = comment.Users_uid;
        this.UserNickname = comment.User ? comment.CommentUser.Users_nickname : null;
        this.UserProfile = comment.User ? comment.CommentUser.profile : null;

        if (comment.Replies) {
            this.Replies = comment.Replies.map((reply) => {
                return {
                    Comments_uid: reply.Comments_uid,
                    Comments_content: reply.Comments_content,
                    Comments_created_at: reply.Comments_created_at,
                    UserNickname: reply.ReplyUser ? reply.ReplyUser.Users_nickname : null,
                    UserProfile: reply.ReplyUser ? reply.ReplyUser.profile : null,
                };
            });
        }
    }
}

module.exports = {
    CommentViewResponseDTO,
};
