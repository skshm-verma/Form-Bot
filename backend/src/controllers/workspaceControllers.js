const UnauthenticatedError = require('../errors/unauthenticated');
const User = require('../models/User');
const statusCodes = require("../utils/constants");


const verifyUser = async (req, res) => {

    const userId = req.userId;
    const userName = req.userName;
    const user = await User.findById(userId);
    //if the user is not found
    if (!user) {
        throw new UnauthenticatedError('Token Malfunctioned');
    }

    if (user._id.toString() !== userId) {
        throw new UnauthenticatedError("Permissons didn't matched");
    }

    res.status(statusCodes.OK).json({ userName, userId });
}



const getForms = async (folderId) => {
    try {

    } catch (error) {

    }
}

module.exports = { verifyUser, getForms }