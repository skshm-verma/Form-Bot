const {BadRequestError, NotFoundError} = require('../errors/notFound');
const User = require('../models/User');
const Folder = require('../models/Folder');
const Form = require('../models/Form');
const statusCodes = require("../utils/constants");


const createForm = async (req, res) => {
    const { userId, title, folderName } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    let folder;
    if (folderName) {
        folder = await Folder.findOne({ userId, name: folderName });

        if (!folder) {
            folder = new Folder({ userId, name: folderName });
            await folder.save();
            user.folders.push(folder._id);
            await user.save();
        }
    } else {
        folder = await Folder.findOne({ userId, name: 'main' });
        if (!folder) {
            folder = new Folder({ userId, name: 'main' });
            await folder.save();
            user.folders.push(folder._id);
            await user.save();
        }
    }

    const form = new Form({ title, folderId: folder._id });
    await form.save();

    folder.forms.push(form._id);
    await folder.save();

    user.forms.push(form._id);
    await user.save();

    res.status(statusCodes.CREATED).json({ form });
}


const createFolder = async (req, res) => {
    const { userId, folderName } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const folder = new Folder({ userId, name: folderName });
    await folder.save();

    user.folders.push(folder._id);
    await user.save();

    res.status(statusCodes.CREATED).json({ message: `${folder.name} Folder Created`, folderId: folder._id });

}

const getAllFolders = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(userId).populate('folders');
    // populate() method is used to replace the user ObjectId field with the whole document consisting of all the user data.
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const folderNames = user.folders.map(folder => folder.name);
    res.status(statusCodes.OK).json({ message: "Success", folderNames });
}

const getAllForms = () => {

}

module.exports = { createForm, createFolder, getAllFolders, getAllForms }