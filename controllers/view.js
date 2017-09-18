
const viewController = function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello !!!!'});
}

module.exports = viewController
