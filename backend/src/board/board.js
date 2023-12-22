module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    "Boards",
    {
      Boards_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Boards_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Boards_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Boards_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now()"),
      },
      Boards_views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Boards.associate = function (models) {
    // 이미지와 좋아요 모델에 CASCADE 옵션 추가
    Boards.hasMany(models.Images, {
      foreignKey: "Boards_id",
      as: "Images",
      onDelete: "CASCADE",
    });
    Boards.hasMany(models.Likes, {
      foreignKey: "Boards_id",
      as: "Likes",
      onDelete: "CASCADE",
    });

    // 유저 모델 관계 설정에 SET NULL 옵션 추가
    Boards.belongsTo(models.Users, {
      foreignKey: "Users_id",
      as: "Users",
      onDelete: "SET NULL",
    });
  };

  return Boards;
};
