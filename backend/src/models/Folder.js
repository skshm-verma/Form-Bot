const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Provide Folder Name']
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }]
})

// Create a compound index on userId and name to ensure uniqueness within the user's folders
folderSchema.index({ userId: 1, name: 1 }, { unique: true });
module.exports = mongoose.model("Folder", folderSchema);