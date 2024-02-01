const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const weightRoute = require("./routes/Weight")(io).router;
app.use("/api/v1/weight", weightRoute);
app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(5001, () => {
  console.log("Server is running");
});

app.use("/images", express.static("images"));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection succesfull"))
  .catch((err) => {
    console.log(err);
  });
