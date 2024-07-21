const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide Folder Name'],
        unique: true
    }
})


module.exports = mongoose.model("Folder", folderSchema);