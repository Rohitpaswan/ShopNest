const express = require('express');
const getUser = require('../controllers/userController');
const userRoute = express.Router();
userRoute.get('/', getUser)

module.exports = userRoute;