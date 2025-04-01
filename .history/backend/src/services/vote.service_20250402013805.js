import Poll from '../models/Poll.js';
import Vote from '../models/Vote.js';
import { encrypt } from '../utils/encryption.js';
import { generateFakeVotes } from '../utils/fakeVotes';

export const castVote = async (pollId, optionIndex, userId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    throw new Error('Invalid option index');
  }

  // Check if user has already voted (using encrypted ID)
  const encryptedUserId = encrypt(userId.toString());
  const existingVote = await Vote.findOne({ 
    poll: pollId, 
    encryptedVoterId: encryptedUserId,
    isFake: false,
  });

  if (existingVote) {
    throw new Error('You have already voted in this poll');
  }

  // Create the vote
  const vote = await Vote.create({
    poll: pollId,
    optionIndex,
    encryptedVoterId: encryptedUserId,
    isFake: false,
  });

  // Update poll option vote count
  poll.options[optionIndex].votes += 1;
  await poll.save();

  // Add fake votes if this is the first real vote
  const realVoteCount = await Vote.countDocuments({ poll: pollId, isFake: false });
  if (realVoteCount === 1) {
    const fakeVotes = await generateFakeVotes(pollId, poll.options.length, 1);
    await Vote.insertMany(fakeVotes);
    
    // Update poll with fake votes
    for (const fakeVote of fakeVotes) {
      poll.options[fakeVote.optionIndex].votes += 1;
    }
    await poll.save();
  }

  return vote;
};