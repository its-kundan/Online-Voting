import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide a question'],
      trim: true,
      maxlength: [200, 'Question cannot be more than 200 characters'],
    },
    options: [
      {
        option: {
          type: String,
          required: [true, 'Please provide an option'],
          trim: true,
          maxlength: [100, 'Option cannot be more than 100 characters'],
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Poll', PollSchema);