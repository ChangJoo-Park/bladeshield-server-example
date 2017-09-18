const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
const db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
  console.log('Connected to mongod server')
})

mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL)

// Set static
app.use('/static', express.static('public'));

// View Engine
app.set('view engine', 'pug');
const viewController = require('./controllers/view')
app.get('/', viewController);

// Routes for API
const issues = require('./routers/issues')
app.use('/api/issues', issues)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
