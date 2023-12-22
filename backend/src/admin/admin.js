module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Admin",
    {
      Admin_uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Admin_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      Admin_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now()"),
      },
      Admin_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_profile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Admin_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
