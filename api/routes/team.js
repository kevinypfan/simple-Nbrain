const express = require("express");
const router = express.Router();
const _ = require('lodash');

const { Team } = require('../models/team');

const { authenticate } = require('../middleware/authenticate');

router.post('/createTeam', authenticate, (req, res) => {
  var body =  _.pick(req.body,['teamName', 'title', 'registers', 'teacher', 'leader']);
  var team = new Team(body);

  team.save().then((result) => {
    res.send(result)
  }).catch((e) => {
    res.send(e)
  })
})


module.exports = router;
