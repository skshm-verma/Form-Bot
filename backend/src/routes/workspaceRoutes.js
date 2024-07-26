const express = require('express')
const workspaceRouter = express.Router();
const { createFolder, createForm, getFormId, getAllFolders, getAllForms, getFormInputDetails, getFormDetails, createPublicInput, updateFormFields, updateFormViews } = require('../controllers/workspaceControllers');
const verifyToken = require('../middlewares/verifyToken');

// domain/v1/user/signUp
workspaceRouter.post('/newFolder', createFolder);
workspaceRouter.post('/newForm', createForm);
workspaceRouter.get('/allFolders', getAllFolders);
workspaceRouter.get('/allForms', getAllForms);
workspaceRouter.get('/getFormId', getFormId);
workspaceRouter.get('/formInputDetails', getFormInputDetails);
workspaceRouter.get('/formDetails', getFormDetails);
workspaceRouter.patch('/updateFromViews', updateFormViews);
workspaceRouter.post('/publicInput', createPublicInput);

module.exports = workspaceRouter;