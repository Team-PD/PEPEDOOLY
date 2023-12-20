const Kakao = require("./socialLogin/kakao");
const Github = require("./socialLogin/github");
const JWT = require("../lib/jwt");
const jwt = new JWT();
const { Op, where } = require("sequelize");
const { BadRequest } = require("../lib/customException");
const { UserSignupResponseDTO } = require("./dto/user.signup.response.dto");
const bcrypt = require("bcryptjs");
const db = require("../lib/db");

class UserService {
  constructor(User) {
    this.userRepository = User;
  }

  async signup(requestDTO) {
    console.log("service", requestDTO);
    try {
      const [user, isNewRecord] = await this.userRepository.findOrBuild({
        where: { Users_email: requestDTO.userEmail },
      });

      if (!isNewRecord) throw new BadRequest("이미 존재하는 아이디 입니다.");

      user.Users_email = requestDTO.userEmail;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(requestDTO.userPassword, salt);
      console.log("pw : ", requestDTO.userPassword);
      console.log("hash123", hash);
      const temp = await bcrypt.compare(requestDTO.userPassword, hash);
      console.log("temp gg", temp);
      user.Users_password = hash;
      user.Users_name = requestDTO.userName;
      user.Users_nickname = requestDTO.userNickname;
      user.Users_provider = "local";
      user.Users_created_at = Date.now();
      // user.Users_account_locked = true;
      user.Users_email = requestDTO.userEmail;
      // user.Users_profile = "/images/github%20logo.png";
      // user.Role_authority = "user";

      console.log("service signup", user);
      const response = await user.save();
      console.log("회원가입응답:", response);
      const responseDTO = new UserSignupResponseDTO(response.dataValues);

      return responseDTO;
    } catch (e) {
      throw e;
    }
  }

  async login(provider, code, userLoginRequestDTO) {
    try {
      let userInfo;
      let user;

      if (provider === "kakao") {
        const kakao = new Kakao(code);
        userInfo = await kakao.getSocialUserInfo();
        user = this.userRepository.build(kakao.buildUser(userInfo));
      }

      if (provider === "github") {
        const github = new Github(code);
        userInfo = await kakao.getSocialUserInfo();
        user = this.userRepository.build(github.buildUser(userInfo));
      }

      if (provider === "login") {
        const result = await this.userRepository.findOne({
          where: {
            [Op.and]: [
              { Users_email: userLoginRequestDTO.userEmail },
              { Users_provider: "local" },
            ],
          },
        });

        if (!result)
          throw new BadRequest("이메일 혹은 비밀번호를 확인해 주세요.");

        console.log("리저트", result);

        console.log("sadasd", userLoginRequestDTO.userPassword);
        console.log("333", result.dataValues.Users_password);
        const isPasswordCorrect = await bcrypt.compare(
          userLoginRequestDTO.userPassword,
          result.dataValues.Users_password
        );
        // $2a$10$lTVfP10qY7WKOlUwMmc1f.r.rssKTMcK9ERgo7ulHZYrXSuA4DrUm
        console.log("이즈패스워드", isPasswordCorrect);
        if (!isPasswordCorrect)
          throw new BadRequest("아이디 혹은 비밀번호를 확인해주세요.");

        const { dataValues: user } = result;
        console.log(result);
        // const { Users_name, Users_nickname, Users_email } = result.dataValues;
        // console.log(Users_name);
        // console.log(Users_email);
        // console.log(Users_nickname);

        // Users.dataValues.Users_name;
        // Users.dataValues.Users_nickname;
        // Users.dataValues.Users_email;
        // Users.dataValues.Users_nickname;

        // if (!result) return;
        // if (!result) return { message: "가입하지 않은 유저입니다." };

        console.log("sethwt", setJWTToken(user));
        return { userResult: result, token: setJWTToken(user) };
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async loginChecked(token) {
    try {
      return jwt.verify(token);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async profileUpload(requestDTO) {
    try {
      let domain;
      domain = `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/`;

      const filePath = domain + requestDTO.profile.filename;

      const [result] = await this.userRepository.update(
        { Users_profile: filePath },
        {
          where: {
            Users_uid: requestDTO.userUid,
          },
        }
      );
      return filePath;
    } catch (e) {
      throw e;
    }
  }

  async userInfoUpdate(requestDTO) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const result = await this.userRepository.update(
        {
          Users_nickname: requestDTO.userNickname,
          Users_name: requestDTO.userName,
          Users_email: requestDTO.userEmail,
          Users_password: requestDTO.userPassword
            ? bcrypt.hashSync(requestDTO.userPassword, salt)
            : "password",
        },
        {
          where: {
            Users_uid: requestDTO.userUid,
          },
        }
      );
      return result;
    } catch (e) {
      throw e;
    }
  }
}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload);
  return token;
};

module.exports = UserService;
