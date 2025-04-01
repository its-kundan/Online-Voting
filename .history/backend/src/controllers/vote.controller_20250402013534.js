import { castVote } from '../services/vote.service.js';

export const vote = async (req, res, next) => {
  try {
    const { optionIndex } = req.body;
    const vote = await castVote(req.params.pollId, optionIndex, req.user._id);
    res.status(201).json(vote);
  } catch (error) {
    next(error);
  }
};