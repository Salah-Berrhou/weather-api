var express = require('express');
var router = express.Router();
const User = require('../db/model/user')

/* GET home page. */
router.post('/user', async(req, res, next) => {
  const user = new User(req.body)
  try{
    await user.save()
    res.send(user)
  }catch (e){
    res.status(500).send(e)
  }
});

module.exports = router;
