'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Goal Model
const Goal = require('../models/goal');
// Load User Model
const User = require('../models/user');

// @route   GET api/goals/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'api/goals/test public route success' }));
// router.get('/test', (req, res) => res.json('api/goals/test public route success'));

// @route   GET api/goals/:id
// @desc    Get user's goals
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // console.log(req.params.id);

  Goal.find({userId: req.params.id})
    .then(goals => {
      console.log(goals);
      res.json(goals)
    })
    .catch(err => res.json(err));
});


// @route   POST api/goals/
// @desc    Create user goals
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const {title, details} = req.body;
  const userId = req.user._id;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  const newGoal = {title, userId, details};

  Goal.create(newGoal)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;