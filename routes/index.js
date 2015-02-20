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
  console.log(maintext)
  docs.maintext = maintext;
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
