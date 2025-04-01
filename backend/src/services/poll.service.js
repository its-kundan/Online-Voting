import Poll from '../models/Poll.js';
import { generateFakeVotes } from '../utils/fakeVotes.js';
import Vote from '../models/Vote.js';

export const createPoll = async (question, options, userId) => {
  const pollOptions = options.map(option => ({ option }));
  
  const poll = await Poll.create({
    question,
    options: pollOptions,
    createdBy: userId,
  });

  return poll;
};

export const getPollById = async (pollId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }
  return poll;
};

export const getPollsByUser = async (userId) => {
  return await Poll.find({ createdBy: userId });
};

export const getPollResults = async (pollId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) {
    throw new Error('Poll not found');
  }

  // Get real votes
  const votes = await Vote.find({ poll: pollId, isFake: false });
  
  // Get fake votes
  const fakeVotes = await Vote.find({ poll: pollId, isFake: true });

  // Combine votes
  const allVotes = [...votes, ...fakeVotes];

  // Calculate results
  const results = poll.options.map((option, index) => {
    const voteCount = allVotes.filter(v => v.optionIndex === index).length;
    const percentage = allVotes.length > 0 
      ? (voteCount / allVotes.length) * 100 
      : 0;
    
    return {
      option: option.option,
      votes: voteCount,
      percentage: percentage.toFixed(2),
    };
  });

  // Determine winner
  let winner = null;
  if (allVotes.length > 0) {
    const maxVotes = Math.max(...results.map(r => r.votes));
    const winningOptions = results.filter(r => r.votes === maxVotes);
    winner = winningOptions.length === 1 
      ? winningOptions[0] 
      : { option: 'Tie', votes: maxVotes, percentage: '0' };
  }

  return {
    question: poll.question,
    totalVotes: allVotes.length,
    results,
    winner,
    fakeVotesCount: fakeVotes.length,
  };
};