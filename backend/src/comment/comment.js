module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment",
        {
            Comments_uid: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            Users_uid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // 여기에 외래키 설정을 추가할 예정
            },
            Boards_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // 여기에 외래키 설정을 추가할 예정
            },
            Comments_content: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Comments_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            // 대댓글부분임
            ParentCommentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "Comments",
                    key: "Comments_uid",
                },
                foreignKey: {
                    name: "fk_parent_comment",
                },
            },
        },
        {
            tableName: "Comments",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Comment;
};
