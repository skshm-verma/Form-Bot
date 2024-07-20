const express = require('express')
const router = express.Router();
const userRouter = require("./userRoutes");
const formRouter = require('./userFormRoutes');


router.use('/user', userRouter);  // domain/v1/user
router.use('/formbot', formRouter);  // domain/v1/formbot

module.exports = router;