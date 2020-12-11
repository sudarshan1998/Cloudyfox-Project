const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");



app.use(express.static(path.join(path.resolve("uploads"))));
app.use(cors());

app.use("/account", require("./routes/account.js"));
app.use("/login", require("./routes/login.js"));
app.use("/post", require("./routes/post.js"));
app.use("/comment", require("./routes/comment.js"));


module.exports = app;