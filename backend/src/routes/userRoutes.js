const express = require('express')
const userRouter = express.Router();
const { userSignUp, userSignIn } = require('../controllers/userControllers');

userRouter.post('/signUp', userSignUp);   // domain/v1/user/signUp
userRouter.post('/signIn', userSignIn);   // domain/v1/user/signIn


module.exports = userRouter;