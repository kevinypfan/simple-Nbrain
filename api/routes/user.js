const express = require("express");
const router = express.Router();
const _ = require('lodash');

const { User } = require('../models/user');
const { System } = require('../models/system');

const { authenticate } = require('../middleware/authenticate');
const { testMid } = require('../middleware/test');

const { successSignupMail, sendEmail, forgotPasswordMail, updatePasswordMail, sendEmailPromise } = require('../modules/mailerMod.js');

router.get('/test', (req, res) => {
  res.send({
    data: 'success'
  })
})


router.post('/signup',(req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'name', 'phone', 'studentId', 'department', 'lineId', 'roleId'])

  body.time = new Date().toString();

  var user = new User(body);
  user.save().then((user) => {
    return Promise.all([user.generateAuthToken(), System.findOne({'name':"systemArg"})])
  }).then(([ {token, roleId}, system ]) => {
    successSignupMail.html = system.successSignup
    successSignupMail.to = body.email
    sendEmail(successSignupMail)
    res.header('authToken', token).send({
      roleId: roleId
    });
  }).catch((e) => {
    res.status(400).send({
      message: e
    });
  })
});

router.post('/signin', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken()
  }).then(({token, roleId}) => {
    console.log(token);
    res.header('authToken', token).send({
      roleId: roleId
    });
  }).catch((e) => {
    res.status(403).send(e);
  })
})

router.get('/me', authenticate, (req, res) => {
  var user = req.user
  var objUser = user.toJson()
  res.send(objUser);
})

router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch(() => {
    res.status(400).send();
  })
})

router.patch('/userUpdata', authenticate, (req, res) => {
  var body = _.pick(req.body, ['name','phone','studentId','department','lineId'])
  var token = req.token
  User.findByToken(token).then(user => {
    return user.userUpdata(body)
  }).then((user) => {
    res.send({
      message: "更改成功"
    });
  }).catch((e) => {
    res.status(403).send({
      error: e
    });
  })
})

router.get('/role/:email', (req, res) => {
  var email = req.params.email;
  User.findOne({email}).then((user) => {
    res.send({roleId: user.roleId,name: user.name})
  }).catch((e)=>{
    res.status(403).send();
  })
})

module.exports = router;
