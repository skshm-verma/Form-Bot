const mongoose = require('mongoose');

const publicInputsSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    date: { type: String, required: true },
    labelName: { type: String, required: true },
    response: { type: String, required: true }
});

module.exports = mongoose.model("PublicInput", publicInputsSchema);