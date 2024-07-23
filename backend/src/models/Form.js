const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: [true, 'Provide Folder']
    },
    fields: [
        {
          type: { type: String, required: true },
          content: { type: String },
          public: { type: Boolean, default: false }
        }
      ]
})


module.exports = mongoose.model("Form", formSchema);