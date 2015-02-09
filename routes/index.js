var express = require('express');
var router = express.Router();
var db = require('./../config/db').dreamsonpaper;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get("simplicity-invitation", function(err, doc) {
      res.render('index', { title: 'Express' });
  })

});

router.get('/customise', function(req, res, next) {
console.log(req.params)
  res.render('customise', {
    ebay_id: req.query.ebay_id
  })
})

router.post('/sendform', function(req, res, next) {
req.body.type = "ORDER"
  db.save(req.body, function(err, result) {
    console.log(err, result)
    res.render("thank_you")
  })
})
module.exports = router;
