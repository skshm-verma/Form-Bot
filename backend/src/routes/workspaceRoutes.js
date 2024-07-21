const express = require('express')
const workspaceRouter = express.Router();
const { sendUser } = require('../controllers/workspaceControllers');
const verifyToken = require('../middlewares/verifyToken');

workspaceRouter.get('/', verifyToken, sendUser);   // domain/v1/user/signUp


module.exports = workspaceRouter;