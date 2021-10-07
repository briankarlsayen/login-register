const router = require('express').Router();

router.get('/private', (req, res)=> {
  res.send(req.user)
  //res.json({message:'I need money'})
})

module.exports = router