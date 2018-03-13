const mongoose = require('mongoose');
const _ = require('lodash');
var SystemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "systemArg",
    unique: true
  },
  carousel: [{
    imgPath: {
      type: String
    }
  }],
  successSignup: {
    type: String
  },
  successCreate: {
    type: String
  },
  gameTitle: {
    type: String
  },
  registrationStart: {
    type: String
  },
  registrationEnd: {
    type: String
  },
  trialStart: {
    type: String
  },
  trialEnd: {
    type: String
  },
  gamePath: {
    type: String
  },
  email: {
    type: String
  },
  AllTeamFile:{
    type:String
  },
  AllTeamNameData:{
    type:String
  }
},
{
    usePushEach: true
})

SystemSchema.methods.removeCarousel = function (carouselId) {
  var system = this;
  return system.update({
    $pull: {
      carousel: {_id: carouselId}
    }
  })
}

SystemSchema.methods.pushGamePath = function (gamePath) {
  var system = this;
  return system.update({$set: {gamePath}})
}

SystemSchema.methods.pushCarouselPhoto = function (imgPath) {
  var system = this;
  system.carousel.push({imgPath})
  return system.save().then((result) => {
    return result
  })
}

var System = mongoose.model('System',SystemSchema)

module.exports = {System}
