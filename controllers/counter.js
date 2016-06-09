/**
 * GET /test
 */
exports.test = function(req, res) {
  res.render('test', {
    title: 'Test'
  });
};

exports.ping = function(req, res) {
  console.log(req.query)

  res.send("Hello, World")
}