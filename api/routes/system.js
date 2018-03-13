const express = require("express");
const router = express.Router();
const _ = require('lodash');

const {System} = require('../models/system');

const {verifyRole} = require('../middleware/authenticate');

const { initialSystem } = require('../seed/initialSystem');

initialSystem();

router.post('/successCreate', verifyRole, (req, res) => {
  var successCreate = req.body.successCreate
  System.findOneAndUpdate({'name':"systemArg"},{
    $set: { successCreate }
  }).then((result)=>{
    res.send("成功更新或修改")
  }).catch((e)=>{
      res.status(404).send("取得失敗");
  })
})

router.post('/successSignup', verifyRole, (req, res) => {
  var successSignup = req.body.successSignup
  System.findOneAndUpdate({'name':'systemArg'}, {
    $set: { successSignup }
  }).then((result)=>{
    res.send("成功更新或修改")
  }).catch((e)=>{
    res.status(403).send("取得失敗");
  })
})

router.post('/sysArgument',verifyRole,(req,res)=>{
  var body = _.pick(req.body,['gameTitle','email','registrationStart','registrationEnd', 'trialStart', 'trialEnd', 'successCreate', 'successSignup'])

  var systems = new System(body)
  systems.save().then(()=>{
    res.send(systems)
  }).catch((e)=>{
    res.status(401).send(e)
  })
})

router.patch('/updateArg', verifyRole, (req, res) => {
    var body =_.pick(req.body,['gameTitle','email','registrationStart','registrationEnd', 'trialStart', 'trialEnd'])
    console.log(body)
    var { gameTitle, email, registrationStart, registrationEnd, trialStart, trialEnd } = body
    System.findOneAndUpdate({'name':"systemArg"},{
      $set: { gameTitle, email, registrationStart, registrationEnd, trialStart, trialEnd }
    }).then(()=>{
      res.send(body)
    }).catch((e)=>{
      res.status(404).send("取得失敗");
    })
})

router.get('/getArg',verifyRole,(req,res)=>{
  System.find({'name':"systemArg"}).then((result)=>{
    console.log(result);
    if(result == null){
      res.status(404).send("取得失敗")
    }
    else {
      res.send(result)
    }
  })
})

module.exports = router;
