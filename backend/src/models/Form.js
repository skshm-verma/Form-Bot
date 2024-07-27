const mongoose = require('mongoose');
const PublicInput = require('./PublicInput').schema;

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: [true, 'Provide Folder']
  },
  fields: [
    {
      label: { type: String, required: true },
      icon: { type: String, required: true },
      placeholder: { type: String, required: true },
      type: { type: String, required: true },
      content: { type: String, default: "Hi" },
      public: { type: Boolean, default: false }
    }
  ],
  userInputs: [PublicInput],
  views: {
    type: Number,
    default: 0
  },
  theme: {
    type: String,
    default: 'light'
  }
})


module.exports = mongoose.model("Form", formSchema);