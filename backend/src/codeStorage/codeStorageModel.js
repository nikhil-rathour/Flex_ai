import mongoose from 'mongoose';

const codeStorageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique : true
  },
  code: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const CodeStorage = mongoose.model('CodeStorage', codeStorageSchema);

export default CodeStorage;
