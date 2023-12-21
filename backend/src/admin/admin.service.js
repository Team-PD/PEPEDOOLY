const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const JWT = require("../lib/jwt");
const jwt = new JWT();
const { BadRequest } = require("../lib/customException");

class AdminService {
  constructor(Admin) {
    this.admin = Admin;
  }

  async login(adminLoginRequestDTO) {
    try {
      const result = await this.admin.findOne({
        where: {
          [Op.and]: [{ Admin_id: adminLoginRequestDTO.adminId }],
        },
      });
      if (!result)
        throw new BadRequest("이메일 혹은 비밀번호를 확인해 주세요.");
      const isPasswordCorrect =
        adminLoginRequestDTO.adminPassword === result.dataValues.Admin_password;
      if (!isPasswordCorrect)
        throw new BadRequest("아이디 혹은 비밀번호를 확인해주세요.");
      const { dataValues: admin } = result;
      return { adminResult: result, token: setJWTToken(admin) };
    } catch (e) {
      console.error("Admin login Error", e);
      throw new Error(e.message);
    }
  }

  async getAdminById(adminInfoRequestDTO) {
    const admin = await this.admin.findOne({
      where: { Admin_uid: adminInfoRequestDTO.adminUid },
    });
    const adminInfo = admin.dataValues;
    return adminInfo;
  }

  async getAdminData(decoded) {
    const admin = await this.admin.findOne({
      where: { Admin_uid: decoded.payload.adminUid },
    });
    const adminInfo = admin.dataValues;
    return adminInfo;
  }

  async updateAdmin(adminData) {
    try {
      await this.admin.update(
        { Admin_profile: adminData.Admin_profile, ...adminData },
        { where: { Admin_id: adminData.id } }
      );
    } catch (error) {
      console.error("Error updating admin info:", error);
      throw error;
    }
  }
}

const setJWTToken = (data) => {
  const jwtPayload = data;
  const token = jwt.sign(jwtPayload);
  return token;
};

module.exports = AdminService;
