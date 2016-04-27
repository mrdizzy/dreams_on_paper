var express = require('express');
var router = express.Router();
var db = require('./../config/db').dreamsonpaper;

exports.update = exports.create = function(req, res) {

  if (req.product) {
    var rev = req.product.rev,
      id = req.product.id;
    req.body._rev = rev;
  }
  else {
    var id = req.body._id
  }

  db.save(id, rev, req.body, function(err, documents) {
    var new_product = req.body;
    new_product._rev = documents.rev;
    if (err) {
      console.log("Unable to save main document", err, documents)
      res.status(500);
      res.end();
    }
}