const axios = require("axios");

const SocialLogin = require("./socialLogin");

const CLIENT_ID = process.env.GI_CLIENT_ID;
const CLIENT_SECRET = process.env.GI_CLIENT_SECRET;

class Github extends SocialLogin {
  constructor(code) {
    super();
    this.code = code;
  }

  async getSocialUserInfo() {
    try {
      const host = "https://github.com/login/oauth/access_token";
      const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: this.code,
      };
      console.log("바디", body);

      const response = await axios.post(host, body);
      console.log("response", response);
      const access_token = response.data
        .split("&")[0]
        .split("access_token=")[1];

      const { data: userInfo } = await axios.get(
        "https://api.github.com/user",
        {
          headers: {
            Authorization: `token ${access_token}`,
          },
        }
      );
      console.log(access_token);

      return userInfo;
    } catch (e) {
      console.log("깃허브", e);
    }
  }

  buildUser(userInfo) {
    console.log("유저인포", userInfo);
    return {
      // Users_suid: userInfo.id,
      Users_id: userInfo.id,
      Users_password: "password",
      Users_name: userInfo.name,
      Users_nickname: userInfo.login,
      Users_provider: "github",
      Users_email: userInfo.email,
      // Users_profile: userInfo.avatar_url,
      // Role_authority: "user",
    };
  }
}

module.exports = Github;
