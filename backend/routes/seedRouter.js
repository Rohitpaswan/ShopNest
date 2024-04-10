const express = require("express");
const seedUser = require("../controllers/seedController");
const seedRouter = express.Router();
seedRouter.post("/" ,seedUser);

module.exports =seedRouter