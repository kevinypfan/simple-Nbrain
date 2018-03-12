const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teamName: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
  },
  teacher: {
    name: {
      type: String,
      trim: true,
      required: true
    }
  },
  leader: {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    }
  },
  registers: [{
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    }
  }],
  files: [{
    plan: {
      type: String,
      required: true,
      trim: true
    },
    video: {
      type: String,
      required: true,
      trim: true
    },
    register: {
      type: String,
      required: true,
      trim: true
    },
    warrant: {
      type: String,
      required: true,
      trim: true
    },
    cover: {
      type: String,
      required: true,
      trim: true
    }
  }]
},
{
    usePushEach: true
});

var Team = mongoose.model('Team', teamSchema);

module.exports = { Team }
