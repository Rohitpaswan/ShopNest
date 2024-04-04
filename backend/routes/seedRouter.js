const express = require("express");
const seedUser = require("../controllers/seedController");
const seedRouter = express.Router();
seedRouter.get("/" ,seedUser);

module.exports =seedRouter