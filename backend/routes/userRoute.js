const express = require('express');
const {getUsers,getUser, deleteUser, processRegister} = require('../controllers/userController');

const userRoute = express.Router();
userRoute.get('/', getUsers);
userRoute.get('/:id', getUser);
userRoute.delete('/:id', deleteUser);
userRoute.post("/register", processRegister);


module.exports = userRoute;