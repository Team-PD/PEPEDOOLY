const baseDTO = require("../../lib/base.dto");
const { BadRequest } = require("../../lib/customException");

class UserResponseDTO extends baseDTO {
  constructor(user) {
    super();
    this.id = user.id;
    this.email = user.Users_email;
    this.name = user.Users_name;
    this.nickname = user.Users_nickname;
    this.createdAt = user.Users_created_at;

    this.validate(this, BadRequest);
  }
}

module.exports = { UserResponseDTO };
