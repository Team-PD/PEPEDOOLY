const BaseDTO = require("../../lib/base.dto");

class CommentResponseDTO extends BaseDTO {
    Comments_uid;
    Comments_content;
    Comments_created_at;
    Users_uid;
    UserNickname;
    UserProfile;

    constructor(comment) {
        super();
        this.Comments_uid = comment.Comments_uid;
        this.Comments_content = comment.Comments_content;
        this.Comments_created_at = comment.Comments_created_at;
        this.Users_uid = comment.CommentUser ? comment.CommentUser.Users_uid : null;
        this.UserNickname = comment.CommentUser ? comment.CommentUser.Users_nickname : null;
        this.UserProfile = comment.CommentUser ? comment.CommentUser.profile : null;
    }
}

module.exports = {
    CommentResponseDTO,
};
