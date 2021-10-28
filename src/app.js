require("dotenv").config();

const { dbConnect } = require("./config/mongo");
const express = require("express");
const cors = require("cors");
const router = require("./app/routes/index");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

dbConnect();
module.exports = app;
