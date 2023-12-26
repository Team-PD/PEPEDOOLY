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

  async putAdmin(req, res, next) {
    try {
      const file = req.file;
      let imageUrl = "";
      if (file) {
        imageUrl = "/" + file.path;
      }
      const adminData = { Admin_profile: imageUrl, ...req.body };
      const { updatedAdmin, token } = await this.service.updateAdmin(adminData);
      res.clearCookie("authorization");
      res.cookie("authorization", token, {
        maxAge: 60 * 60 * 10000,
        httpOnly: true,
        path: "/",
      });
      return res.send(updatedAdmin);
    } catch (e) {
      next(e);
      console.error("Error updating admin info:", e);
      res.status(500).json({ success: false, e: e.message });
    }
  }
}

module.exports = AdminController;

