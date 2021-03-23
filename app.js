var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var session = require("express-session");
var passport = require("passport");

var User = require("./models/user");
var Task = require("./models/task");

User.sync().then(() => {
  Task.belongsTo(User, { foreignKey: "createdBy" });
  Task.sync();
});

var GitHubStrategy = require("passport-github2").Strategy;
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "a392d7d7f31ade271456";
var GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET ||
  "8ec2cc84e5dca96b716858807903ad0b9c68f41c";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: process.env.HEROKU_URL
        ? process.env.HEROKU_URL + "auth/github/callback"
        : "http://localhost:8000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        // ユーザーの保存
        User.upsert({
          userId: profile.id,
          username: profile.username,
        }).then(() => {
          done(null, profile);
        });
      });
    }
  )
);

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var tasksRouter = require("./routes/tasks");

var app = express();
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "2e77d3a0c5381263",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/tasks", tasksRouter);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {}
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
