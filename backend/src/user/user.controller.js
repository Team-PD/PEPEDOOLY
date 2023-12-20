const { UserSignupRequestDTO } = require("./dto/user.signup.request.dto");
const { UserLoginRequestDTO } = require("./dto/user.login.request.dto");
const {
  UserProfileImageRequestDTO,
} = require("./dto/user.ProfileImageRequestDTO");
const {
  UserProfileFormRequestDTO,
} = require("./dto/user.ProfileFormRequestDTO");
const JWT = require("../lib/jwt");
const jwt = new JWT();

require("dotenv").config();
const PROTOCOL = process.env.PROTOCOL;
const ENV = process.env.ENV;

class UserController {
  constructor(service) {
    this.service = service;
  }

  async postSignup(req, res, next) {
    try {
      console.log("postSign", req.body);
      console.log("1");
      const userSignupRequestDTO = new UserSignupRequestDTO(req.body);
<<<<<<< Updated upstream
      console.log(userSignupRequestDTO);

      const userSignupResponseDTO = await this.service.signup(
        userSignupRequestDTO
      );
      // console.log(userSignupResponseDTO);
      res.status(201).json(new Created(userSignupResponseDTO));
=======
      console.log("2");
      // console.log(userSignupRequestDTO);
      const userSignupResponseDTO = await this.service.signup(
        userSignupRequestDTO
      );
      console.log("3");
      // console.log(userSignupResponseDTO);
      res.status(201);
      console.log("4");
      res.end();
>>>>>>> Stashed changes
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      let code;
      let state;
      let userLoginRequestDTO;
      let chekedToken;
      const provider = req.params.provider;
      console.log("프로바이더", provider);
      console.log("login", req.body);

      if (provider === "kakao") code = req.query.code;
      if (provider === "git") code = req.query.code;
      if (provider === "login") {
        userLoginRequestDTO = new UserLoginRequestDTO(req.body);
      }
      if (provider === "loginCheck") {
        console.log("니가만든쿠키", req.cookies.authorization);
        chekedToken = req.cookies.authorization;
        try {
          if (chekedToken) {
            const userData = await this.service.loginChecked(chekedToken);
            return res.send(userData);
          } else {
            return res.send("쿠키 없음");
          }
        } catch (e) {
          throw e;
        }
      }
      console.log("controller-----", userLoginRequestDTO);

      const { userResult, token } = await this.service.login(
        provider,
        code,
        userLoginRequestDTO
      );
      console.log("controller userresult", userResult);
      console.log("controller token", token);

      // console.log("login controller 토큰", token);
      // if (token) return;
      // console.log("token:", "token");
      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
      });
      return res.send(userResult);
      // return res.redirect("http://localhost:3000");
      // return res.redircet(`localhost:3000?token=${token}`);
      // return res.redirect(
      //   `${PROTOCOL}://${process.env.FRONTEND_SERVER_IP}:${process.env.FRONTEND_SERVER_PORT}?token=${token}`
      // );
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async postProfile(req, res, next) {
    try {
      const userProfileImageRequestDTO = new UserProfileImageRequestDTO(req);

      const result = await this.service.profileUpload(
        userProfileImageRequestDTO
      );
      req.user.Users_profile = result;
      const token = setJWTToken(req.user);

      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
      });

      res.status(201).json(new Created(result));
    } catch (e) {
      next(e);
    }
  }

  async putProfile(req, res, next) {
    try {
      const userProfileFormRequestDTO = new UserProfileFormRequestDTO(req);
      const result = await this.service.userInfoUpdate(
        userProfileFormRequestDTO
      );
      req.user.Users_nickname = userProfileFormRequestDTO.userNickname;
      req.user.Users_name = userProfileFormRequestDTO.userName;
      req.user.Users_email = userProfileFormRequestDTO.userEmail;

      const token = setJWTToken(req.user);
      res.status(201).json(new Created(token));
    } catch (e) {
      next(e);
    }
  }
}
const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload);
  return token;
};
module.exports = UserController;
