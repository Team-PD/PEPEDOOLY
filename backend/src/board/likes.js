module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      Likes_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Boards_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Boards", // 'Boards' 모델을 참조합니다.
          key: "Boards_id",
        },
      },
      Users_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Users", // 'Users' 모델을 참조합니다.
        //   key: "Users_uid",
        // },
      },
      Likes_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      freezeTableName: true, // 테이블 이름을 모델과 동일하게 유지합니다.
      timestamps: true,
    }
  );

  Likes.associate = function (models) {
    Likes.belongsTo(models.Boards, {
      foreignKey: "Boards_id", // 'Boards_id'를 외래 키로 사용합니다.
      as: "Board",
    });

    Likes.belongsTo(models.Users, {
      foreignKey: "Users_id", // 'Users_uid'를 외래 키로 사용합니다.
      as: "Users",
    });
  };

  return Likes;
};
