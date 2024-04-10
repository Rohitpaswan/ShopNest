const express = require('express');
const {getUsers} = require('../controllers/userController');
const {getUser} = require('../controllers/userController');
const userRoute = express.Router();
userRoute.get('/', getUsers);
userRoute.get('/:id', getUser);

module.exports = userRoute;