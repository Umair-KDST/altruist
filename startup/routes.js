const defualt = require("../routes/index");
const auth = require("../routes/auth");
const user = require("../routes/user");
const post = require("../routes/post");
const comment = require("../routes/comment");
const volunteer = require("../routes/volunteer");
const skill = require("../routes/skill");
const reportedPost = require("../routes/reportedPost");
const reportedUser = require("../routes/reportedUser");

module.exports = function (app) {
  app.use("/", defualt),
    app.use("/api/v1/auth", auth),
    app.use("/api/v1/user", user),
    app.use("/api/v1/post", post),
    app.use("/api/v1/comment", comment),
    app.use("/api/v1/skill", skill),
    app.use("/api/v1/volunteer", volunteer),
    app.use("/api/v1/reportpost", reportedPost),
    app.use("/api/v1/reportuser", reportedUser);
};
