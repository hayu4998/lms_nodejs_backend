var routes = require('express').Router();
var db = require('../dao/db');
var publisherDao = require('../dao/publisherDao');

//get all publishers
routes.get('/publisher',function(req,res){
    publisherDao.getAllPublishers(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

//add,update operations
routes.post('/publisher',function(req,res){
    var publisher = req.body;
    var callback = function(err,result){
      if(err){
        res.status(400);
        res.send('operation failed');
      }
      res.status(201);
      res.send('operation successed');
    }

    if(publisher.id != null){ // update
      publisherDao.updatePublisher(publisher,callback);
    }else{ //add
      publisherDao.addPublisher(publisher,callback);
    }
})

//delete
routes.delete('/publisher/:id',function(req,res){
  publisherDao.removePublisher(req.params.id, function(err,result){
    if(err){
      res.status(400);
      res.send('Delete publisher failed');
    }
    res.status(201);
    res.send('Delete publisher Successful');
  });
})
module.exports = routes;
