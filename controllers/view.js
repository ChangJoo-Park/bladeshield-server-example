const Issue = require('../models/issue')

const viewController = function (req, res) {
  Issue.find(function (err, issues) {
    if (err) return res.status(500).send({ error: 'database failure' })
    res.render('index', { issues: issues });
  })
}

module.exports = viewController
