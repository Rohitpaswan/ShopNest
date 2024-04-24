const express = require('express');
const {getUsers,getUser, deleteUser, processRegister, activeUserAccount} = require('../controllers/userController');
const { upload } = require('../middleware/uploadFile.middleware');

const userRoute = express.Router();
userRoute.get('/', getUsers);
userRoute.get('/:id', getUser);
userRoute.delete('/:id', deleteUser);
userRoute.post("/register",upload.single("image"), processRegister);
userRoute.post("/verify", activeUserAccount);


module.exports = userRoute;