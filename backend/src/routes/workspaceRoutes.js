const express = require('express')
const workspaceRouter = express.Router();
const { verifyUser } = require('../controllers/workspaceControllers');
const verifyToken = require('../middlewares/verifyToken');

workspaceRouter.get('/', verifyToken, verifyUser);   // domain/v1/user/signUp


module.exports = workspaceRouter;