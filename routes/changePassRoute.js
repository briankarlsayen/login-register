const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET

router.post("/change-pass", async(req, res) => {
  const {token, newPassword} = req.body

  if (!newPassword || typeof newPassword !== "string"){
    return res.json({status: 'error', error: 'Invalid password'})
  }
  if (newPassword.length < 6){
    return res.json({status: 'error', error: 'Password too short. Should atleast be 6 characters'})
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    const {username} = user
    const getUser = await User.findOne({username}).lean()

    if(await bcrypt.compare(newPassword, getUser.password)){
      return res.json({status: 'error', error: 'Should not be same with previous password'})
    }

    const _id = user.id
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.updateOne({_id}, {'$set': {'password': hashedPassword}})
    res.json({status: "ok",message: 'Change password successful'})
  } catch(err){
    res.json({status: 'error', error: 'No data found'})
  }
})

module.exports = router