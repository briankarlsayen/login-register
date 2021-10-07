const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET

router.post("/login", async(req,res) => {
  const {username, password} = req.body;

  // check username, password, email exist
  if (!username || typeof username !== "string"){
    return res.json({status: 'error', error: 'Invalid username'})
  }
  if (!password || typeof password !== "string"){
    return res.json({status: 'error', error: 'Invalid password'})
  }
  if (password.length < 6){
    return res.json({status: 'error', error: 'Password too short. Should atleast be 6 characters'})
  }
  
  try {
    const user = await User.findOne({username}).lean()  
    if(!user){
      return res.status(500).json({status: 'error', error: 'Invalid username or password'})
    }
    if(await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ id: user._id, username: user.username}, JWT_SECRET)
      return res.status(200).header('auth-token', token).send({token, status: 'ok'})
    }
    return res.status(500).json({status: 'error', error: 'Invalid username or password'})
  }
  catch(err){
    return res.status(500).json({msg: err.message})
  }
})


module.exports = router