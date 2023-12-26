module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
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
      Notice_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
