import {
    createPoll,
    getPollById,
    getPollsByUser,
    getPollResults,
  } from '../services/poll.service.js';
  
  export const create = async (req, res, next) => {
    try {
      const { question, options } = req.body;
      const poll = await createPoll(question, options, req.user._id);
      res.status(201).json(poll);
    } catch (error) {
      next(error);
    }
  };
  
  export const getById = async (req, res, next) => {
    try {
      const poll = await getPollById(req.params.id);
      res.status(200).json(poll);
    } catch (error) {
      next(error);
    }
  };
  
  export const getByUser = async (req, res, next) => {
    try {
      const polls = await getPollsByUser(req.user._id);
      res.status(200).json(polls);
    } catch (error) {
      next(error);
    }
  };
  
  export const getResults = async (req, res, next) => {
    try {
      const results = await getPollResults(req.params.id);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };