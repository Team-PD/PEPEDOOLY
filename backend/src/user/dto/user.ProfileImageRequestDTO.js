const baseDTO = require("../../lib/base.dto");
const { BadRequest } = require("../../lib/customException");

class UserProfileImageRequestDTO extends baseDTO {
  profile;
  userUid;

  constructor(req) {
    super();
    this.profile = req.file;
    this.userUid = req.user.Users_uid;
    this.validate(this, BadRequest);
  }
}

module.exports = {
  UserProfileImageRequestDTO,
};
