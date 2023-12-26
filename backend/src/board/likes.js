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
          model: "Boards",
          key: "Boards_id",
        },
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDislike: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Likes_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Likes.associate = function (models) {
    Likes.belongsTo(models.Boards, {
      foreignKey: "Boards_id",
      as: "Board",
      onDelete: "CASCADE",
    });

    Likes.belongsTo(models.Users, {
      foreignKey: "Users_id",
      as: "Users",
    });
  };

  return Likes;
};
