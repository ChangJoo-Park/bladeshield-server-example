const express = require('express')
const router = express.Router()

const app = express()

// Routes
const issues = require('./routers/issues')

console.log(process.env.DB_URL)
app.use('/api/issues', issues)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
