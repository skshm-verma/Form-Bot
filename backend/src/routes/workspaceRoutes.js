const express = require('express')
const workspaceRouter = express.Router();
const { createFolder, createForm } = require('../controllers/workspaceControllers');
const verifyToken = require('../middlewares/verifyToken');

 // domain/v1/user/signUp
workspaceRouter.post('/newFolder', createFolder);
workspaceRouter.post('/newForm', createForm);

module.exports = workspaceRouter;