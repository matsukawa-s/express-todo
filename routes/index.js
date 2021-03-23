var express = require("express");
var router = express.Router();
const Task = require("../models/task");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

/* GET home page. */
router.get("/", csrfProtection, function (req, res, next) {
  if (req.user) {
    Task.findAll({
      where: {
        createdBy: req.user.id,
      },
      order: [
        ["isDone", "ASC"],
        ["updatedAt", "DESC"],
      ],
    }).then((tasks) => {
      res.render("index", {
        user: req.user,
        tasks: tasks,
        csrfToken: req.csrfToken(),
      });
    });
  } else {
    res.render("index", { user: req.user });
  }
});

module.exports = router;
