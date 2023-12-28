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
            },
            Boards_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
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

    Comment.associate = function (models) {
        Comment.belongsTo(models.Users, {
            foreignKey: "Users_uid",
            as: "CommentUser",
        });
        Comment.belongsTo(models.Boards, {
            foreignKey: "Boards_id",
            as: "CommentBoard",
            onDelete: "CASCADE",
        });
        Comment.belongsTo(models.Users, {
            foreignKey: "Users_uid",
            as: "ReplyUser",
        });
    };

    return Comment;
};
