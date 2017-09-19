const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

router.get('/', function (req, res) {
  Issue.find(function (err, issues) {
    if (err) return res.status(500).send({ error: 'database failure' })
    res.json(issues)
  })
})

router.post('/', function (req, res) {
  const body = req.body
  const issue = new Issue({
    message: body.message || '',
    source: body.source || '',
    lineno: body.lineno || -1,
    colno: body.colno || -1,
    stacktraces: body.stacktraces
  })

  issue.save(function (err, i) {
    if (err) { res.json({ result: 0 }) }
    res.json({ issue: i })
  })
})

module.exports = router
