var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://10.0.0.3:27017/parkers';

var resultArray = [];
var start= 0;
var end= 4;
var done= false;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-first-five', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    resultArray = [];
    start = 0;
    end = 4;
    done = false;
    db.collection('data').find()
    .stream().on('data', function(doc){
      resultArray.push(doc);
    }).on('end', function(){
      db.close();
      getFirstFiveDocuments(res);
    });
  });
});

router.get('/next-five', function(req, res, next) {
  getFirstFiveDocuments(res);
});


function getFirstFiveDocuments(res){
  if(end < resultArray.length){
    res.render('index', {items: resultArray.slice(start,end)});
    start = end;
    end += 5;
  }else if(!done && resultArray.length > 0){
    res.render('index', {items: resultArray.slice(start, resultArray.length -1)});
    done = true;
  }else if(done){
    res.render('index', {items: resultArray.slice(start, resultArray.length -1), message: 'No more items in database'});
  }else{
    res.render('index', {message: 'No items in database, try loading'});
  }
}

module.exports = router;