const express = require('express')
const formRouter = express.Router();
const { getAllForms } = require('../controllers/formControllers');
const verifyToken = require('../middlewares/verifyToken');

formRouter.get('/dashboard', verifyToken, getAllForms);   // domain/v1/user/signUp


module.exports = formRouter;