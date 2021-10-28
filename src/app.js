require("dotenv").config();

const { dbConnect } = require("./config/mongo");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

dbConnect();
module.exports = app;
