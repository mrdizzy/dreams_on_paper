var express = require('express');
var router = express.Router();
var db = require('./../config/db').dreamsonpaper;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get("simplicity-invitation", function(err, doc) {
      res.render('index', { title: 'Express' });
  })

});

module.exports = router;
