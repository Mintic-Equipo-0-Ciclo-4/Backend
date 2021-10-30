require("dotenv").config();

const { dbConnect } = require("./config/mongo");
const session = require("./config/sessions");
const express = require("express");
const cors = require("cors");
const router = require("./app/routes/index");
const app = express();

app.use(express.json());
app.use(cors());
app.use(session);
app.use("/api", router);

dbConnect();
module.exports = app;
