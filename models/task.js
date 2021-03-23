"use strict";
const loader = require("./sequelize-loader");
const Sequelize = loader.Sequelize;

const Task = loader.database.define(
  "tasks",
  {
    taskId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    // タスク名
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // 説明
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // // 期限(年)
    // untilYear: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    // // 期限(月)
    // untilMonth: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    // // 期限(日)
    // untilDate: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    // 完了・未完了
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    // 作成者
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ["createdBy"],
      },
    ],
  }
);

module.exports = Task;
