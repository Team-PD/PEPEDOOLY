module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    "Images",
    {
      Images_uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Boards_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Boards",
          key: "Boards_id",
        },
      },
      Notice_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Notice",
          key: "Notice_id",
        },
      },
      Images_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Images_uploaded_at: {
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

  Images.associate = function (models) {
    Images.belongsTo(models.Boards, {
      foreignKey: "Boards_id",
      as: "Board",
      onDelete: "CASCADE",
    });

    Images.belongsTo(models.Notice, {
      foreignKey: "Notice_id",
      as: "Notice",
      onDelete: "CASCADE",
    });
  };

  return Images;
};
