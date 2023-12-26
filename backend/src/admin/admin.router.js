const express = require("express");
const adminRouter = express.Router();
const { adminController } = require("./admin.module");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const login = adminController.login.bind(adminController);
const logout = adminController.logout.bind(adminController);
const putAdmin = adminController.putAdmin.bind(adminController);

adminRouter.post("/login", login);
adminRouter.get("/logout", logout);
adminRouter.put("/edit", upload.single("image"), putAdmin);
adminRouter.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ success: true, imageUrl });
});

module.exports = adminRouter;

