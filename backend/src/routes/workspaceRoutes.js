const express = require('express')
const workspaceRouter = express.Router();
const { createFolder, createForm, getAllFolders, getAllForms  } = require('../controllers/workspaceControllers');
const verifyToken = require('../middlewares/verifyToken');

 // domain/v1/user/signUp
workspaceRouter.post('/newFolder', createFolder);
workspaceRouter.post('/newForm', createForm);
workspaceRouter.get('/allFolders', getAllFolders);
workspaceRouter.get('/allForms', getAllForms);

module.exports = workspaceRouter;