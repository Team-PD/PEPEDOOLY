const baseDTO = require("../../lib/base.dto");
const { BadRequest } = require("../../lib/customException");

class UserProfileFormRequestDTO extends baseDTO {
  userid;
  userNickname;
  userName;
  userEmail;
  // userPassword

  constructor(body) {
    super();
    console.log(body);
    this.userid = body.Users_id;
    this.userNickname = body.Users_nickname;
    this.userName = body.Users_name;
    this.userEmail = body.Users_email;
    // if (req.user.Users_provider === "local") {
    //   if (req.body.userPassword[0] !== req.body.userPassword[1])
    //     throw new BadRequest("비밀번호가 일치하지 않습니다.");
    //   this.userPassword = req.body.userPassword[0];
    // }
    this.validate(this, BadRequest);
  }
}

module.exports = {
  UserProfileFormRequestDTO,
};
