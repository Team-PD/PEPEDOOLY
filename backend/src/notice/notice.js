module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define(
    "Notice",
    {
      Notice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Notice_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Notice_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Notice_writer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Notice_created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("now()"),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Notice.associate = function (models) {
    Notice.hasMany(models.Images, {
      foreignKey: "Notice_id",
      as: "Images",
      onDelete: "CASCADE",
    });
  };

  return Notice;
};
