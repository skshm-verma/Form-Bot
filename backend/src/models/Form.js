const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: [true, 'Provide Folder']
    }
})


module.exports = mongoose.model("Form", formSchema);