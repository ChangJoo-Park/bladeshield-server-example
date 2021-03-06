const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// Database
const db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
  console.log('Connected to mongod server')
})

if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/bladeshield')
} else {
  mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL)
}

// Set static
app.use('/static', express.static('public'));

// View Engine
app.set('view engine', 'pug');
const viewController = require('./controllers/view')
app.get('/', viewController);

// Routes for API
const issues = require('./routers/issues')
app.use('/api/issues', issues)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Example app listening on port ', port)
})
