const User = require('../models/User');
const statusCodes = require('../utils/constants');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenGenerator');
const { BadRequestError, UnauthenticatedError } = require('../errors/error')



const userSignUp = async (req, res) => {
    // managed the error handling in the errorHandler middleware
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
    })
    await newUser.save();
    res.status(statusCodes.CREATED).json({ message: "SUCCESS", name: newUser.name, email: newUser.email });
}

const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(statusCodes.FORBIDDEN).send("Invalid Email");
    }

    const verifyingPassword = await bcrypt.compare(password, user.password)
    if (!verifyingPassword) {
        res.status(statusCodes.FORBIDDEN).send("Invalid Password");
    }
    const token = generateToken(user._id.toString(), user.name);

    res.status(statusCodes.OK).json({ message: {status: "SUCCESS", email: user.email} , token});
}

module.exports = { userSignUp, userSignIn }