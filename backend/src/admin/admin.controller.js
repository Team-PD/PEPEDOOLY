const { AdminLoginRequestDTO } = require("./dto/admin.dto");
const { BadRequest } = require("../lib/customException");

class AdminController {
  constructor(service) {
    this.service = service;
  }
  async login(req, res, next) {
    try {
      const adminLoginRequestDTO = new AdminLoginRequestDTO(req.body);
      const { adminResult, token } = await this.service.login(
        adminLoginRequestDTO
      );
      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 10000,
        httpOnly: true,
        path: "/",
      });
      return res.send(adminResult);
    } catch (e) {
      console.log("login Error", e);
      next(e);
    }
  }

  logout(req, res, next) {
    try {
      res.clearCookie("authorization").send("로그아웃되었습니다.");
    } catch (e) {
      next(e);
    }
  }

  async putAdmin(req, res) {
    try {
      const file = req.file;
      if (!file) {
        return res
          .status(400)
          .json({ success: false, error: "No file uploaded" });
      }
      const imageUrl = "/" + file.path;
      const adminData = { Admin_profile: imageUrl, ...req.body };
      const { updatedAdmin, token } = await this.service.updateAdmin(adminData);
      res.clearCookie("authorization");
      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 10000,
        httpOnly: true,
        path: "/",
      });
      return res.send(updatedAdmin);
    } catch (error) {
      console.error("Error updating admin info:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = AdminController;
