const Sequelize = require("sequelize");
require("dotenv").config();
const db = {};

const sequelize = new Sequelize(process.env["DB_DATABASE"], process.env["DB_USERNAME"], process.env["DB_PASSWORD"], {
    host: process.env["DB_HOST"],
    dialect: process.env["DB_DIALECT"],
    port: process.env["DB_PORT"],
});

const entityList = [
    `../admin/admin`,
    `../notice/notice`,
    `../comment/comment`,
    "../user/user",
    `../board/board`,
    "../board/images",
    "../board/likes",
];

entityList.forEach((entity) => {
    const model = require(entity)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});


db["Comment"].hasMany(db["Comment"], {
    as: "Replies",
    foreignKey: "ParentCommentId",
});
db["Comment"].belongsTo(db["Comment"], {
    as: "ParentComment",
    foreignKey: "ParentCommentId",
});


// 모델 간 관계 설정
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db); // 각 모델의 연관 관계를 설정합니다.
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// console.log("Loaded models", db);
