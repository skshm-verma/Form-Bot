const User = require('../models/User');
const statusCodes = require('../utils/constants');


const userSignUp =  async (req,res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password,
    })
    await newUser.save();
    res.status(statusCodes.CREATED).json({ message: "OK", name: newUser.name, email: newUser.email });
}

module.exports = { userSignUp }