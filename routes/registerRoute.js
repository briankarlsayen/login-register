const router = require('express').Router();
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

router.post('/register', async(req, res) => {
  const {username, password, email} = req.body;
  
  //put this on a middleware
  if (!username || typeof username !== "string"){
    return res.json({status: 'error', error: 'Invalid username'})
  }
  if (!password || typeof password !== "string"){
    return res.json({status: 'error', error: 'Invalid password'})
  }
  if (password.length < 6){
    return res.json({status: 'error', error: 'Password too short. Should atleast be 6 characters'})
  }
  if (!email || typeof password !== "string"){
    return res.json({status: 'error', error: 'Invalid Email'})
  }

  const newUser = await User.findOne({username}).lean()
  const newMail = await User.findOne({email}).lean()
  if(newUser){
    return res.status(500).json({status: 'error', error: 'Username is already inuse'})
  }
  if(newMail){
    return res.status(500).json({status: 'error', error: 'Email is already inuse'})
  }

  

  const user = new User({
    username: username,
    password: await bcrypt.hash(password, 10),
    email: email
  })
  try {
    const saveUser = await user.save();
    //res.send({user: user._id})
    res.status(200).json({status:'ok', message: 'Account succesfully made'})
  }
  catch(err){
    return res.status(400).json({msg: err.message})
  }
})

module.exports = router