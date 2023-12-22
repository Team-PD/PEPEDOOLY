const JWT = require("./jwt");
const jwt = new JWT();
const db = require("./db");
require("dotenv").config();

const UserService = require("../user/user.service");
const AdminService = require("../admin/admin.service");
const { Users, Admin } = db;
const userService = new UserService(Users);
const adminService = new AdminService(Admin);

class AuthMiddleware {
  static async adminAuth(req, res, next) {
    try {
      const cookie = req.headers.authorization;
      const token = cookie.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token provided");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        throw new Error("Invalid token");
      }

      const adminInfo = await adminService.getAdminData(decoded);
      if (!adminInfo) {
        throw new Error("admin not found");
      }
      req.admin = adminInfo;
      next();
    } catch (e) {
      next(e);
    }
  }

  static async auth(req, res, next) {
    try {
      // Implement your logic here
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthMiddleware;
