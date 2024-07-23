const { BadRequestError, NotFoundError } = require('../errors/error');
const User = require('../models/User');
const Folder = require('../models/Folder');
const Form = require('../models/Form');
const statusCodes = require("../utils/constants");

// NOTE: I HAVE HANDLED All ERRORS GLOBALLY AT ERROR-HANDLER MIDDLEWARE

const createForm = async (req, res) => {
    const { userId, title, folderId, fields } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    let folder;

    if (folderId) {
        folder = await Folder.findById(folderId);
        if (!folder) {
            throw new NotFoundError('Folder not found');
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

    const form = new Form({
        title: title.trim(),
        folderId: folder._id,
        fields
    });
    await form.save();

    folder.forms.push(form._id);
    await folder.save();

    user.forms.push(form._id);
    await user.save();

    res.status(statusCodes.CREATED).json({ message: `Successfully Form Created`, form });
}


const createFolder = async (req, res) => {
    const { userId, folderName } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const folder = new Folder({ userId, name: folderName.trim() });
    await folder.save();

    user.folders.push(folder._id);
    await user.save();

    res.status(statusCodes.CREATED).json({ message: `${folder.name} Folder Created`, folderId: folder._id });
}

const getAllFolders = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        throw new BadRequestError("User ID is required");
    }
    const user = await User.findById(userId).populate('folders');
    // populate() method is used to replace the user ObjectId field with the whole document consisting of all the user data.
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const folders = user.folders.map(folder => ({
        name: folder.name,
        id: folder._id
    }));
    res.status(statusCodes.OK).json({ message: "Success", folders });
}

const getAllForms = async (req, res) => {
    const { folderId } = req.query;

    if (!folderId) {
        throw new BadRequestError("Folder ID is required");
    }

    const folder = await Folder.findById(folderId).populate('forms');
    if (!folder) {
        throw new NotFoundError("Folder not found");
    }

    const formNames = folder.forms.map(form => form.title);
    res.status(statusCodes.OK).json({ message: "Success", formNames });
}

module.exports = { createForm, createFolder, getAllFolders, getAllForms }