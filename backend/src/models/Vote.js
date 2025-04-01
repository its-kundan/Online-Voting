import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },
    optionIndex: {
      type: Number,
      required: true,
    },
    encryptedVoterId: {
      type: String,
      required: true,
    },
    isFake: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Vote', VoteSchema);