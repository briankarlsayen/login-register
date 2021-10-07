const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const registerRoute = require('./routes/registerRoute.js')
const loginRoute = require('./routes/loginRoute.js')
const changePassRoute = require('./routes/changePassRoute.js')
const seePrivateRoute = require('./routes/seePrivate.js')
const verifyToken = require('./verifyToken.js')

//middlewares
app.use(express.json())
app.use(cors())

//mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open',()=> {
  console.log('connected to database')
})

//routes
app.get('/', (req, res)=> {
  res.send('hi')
});
app.use('/api', registerRoute)
app.use('/api', loginRoute)
app.use('/',verifyToken, seePrivateRoute)
app.use('/api', changePassRoute)

const port = 5000 || process.env.PORT;
app.listen(port, ()=> {console.log(`listening to port${port}`)})