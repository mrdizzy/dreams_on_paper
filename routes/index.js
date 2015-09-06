var express = require('express');
var router = express.Router();
var db = require('./../config/db').dreamsonpaper;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get("simplicity-invitation", function(err, doc) {
      res.render('index', { title: 'Express' });
  })

});

router.get('/orders', function(req, res, next) {
  db.view('orders/order', function(err, docs) {
  docs = docs.toArray();
    res.render('orders', { orders: docs })
  })
})


router.get('/invitations/new', function(req, res, next) {
    res.render('invitations/new')
})

router.post('/invitations', function(req, res, next) {
  db.save(req.body, function(err, result) {
    console.log(err, result)
  })
  res.send(200)
})

router.get('/customise', function(req, res, next) {
  res.render('customise', {
    ebay_id: req.query.ebay_id,
    order: ""
  })
})

router.get('/invitations/:id', function(req, res, next) {
db.get(req.params.id, function(err, docs) {
var maintext = [];
  for(var i=0; i<7; i++) {
    if (docs["maintext" + i]) {
      maintext.push(docs["maintext" + i])
    }
  }
  docs.maintext = maintext;
  console.log(docs)
  res.render('customise', {
    order: docs, 
    ebay_id: ""
  })
  
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
