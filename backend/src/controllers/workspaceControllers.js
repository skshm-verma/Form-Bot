const statusCodes = require("../utils/constants");

const sendUser = async (req, res) => {
    const userId = req.userId;
    const userName = req.userName;
    res.status(statusCodes.OK).json({ userName, userId });
}

module.exports = { sendUser }