const express = require('express')
const workspaceRouter = express.Router();
const { createFolder, createForm, getFormId, getAllFolders, getAllForms, getFormInputDetails, getFormDetails, createPublicInput, updateFormFields, updateFormTheme, updateFormViews, deleteFolder, deleteForm } = require('../controllers/workspaceControllers');

// domain/v1/user/signUp
workspaceRouter.post('/newFolder', createFolder);
workspaceRouter.post('/newForm', createForm);
workspaceRouter.get('/allFolders', getAllFolders);
workspaceRouter.get('/allForms', getAllForms);
workspaceRouter.get('/getFormId', getFormId);
workspaceRouter.get('/formInputDetails', getFormInputDetails);
workspaceRouter.get('/formDetails', getFormDetails);
workspaceRouter.patch('/updateFormData', updateFormFields);
workspaceRouter.patch('/updateFormTheme', updateFormTheme);
workspaceRouter.patch('/updateFromViews', updateFormViews);
workspaceRouter.post('/publicInput', createPublicInput);
workspaceRouter.delete('/deleteFolder', deleteFolder);
workspaceRouter.delete('/deleteForm', deleteForm);

module.exports = workspaceRouter;