const {System} = require('../models/system');

const initialSystem = () => {
  System.find({'name':'systemArg'}).then((result) => {
    if (result.length == 0) {
      let systems = new System({
        "gameTitle": "金腦獎比賽",
        "email": "fkoasof@feofjoe.asokdj",
        "registrationStart": "2017-12-09",
        "registrationEnd": "2017-12-09",
        "trialStart": "2017-12-09",
        "trialEnd": "2017-12-09",
        "successSignup": "恭喜您註冊成功",
        "successCreate": "恭喜您隊伍創建成功"
      })
      systems.save().then(() => {
        console.log('initial success');
      }).catch(() => {
        console.log('initial fail');
      })
    }
  })
}

module.exports = { initialSystem };
