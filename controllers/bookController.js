var routes = require('express').Router();
var db = require('../dao/db');
var bookDao = require('../dao/bookDao');

routes.get('/book',function(req,res){
    bookDao.getAllBooks(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/book', function(req, res){
  var book = req.body;
  var callback= function(err, result){
    if(err){
      res.status(400);
      res.send('operation on Book Failed!');
    }else{
      res.status(201);
      //res.send('operation on Book Successful!');
    }
  }
  if(book.book_id == null){ //add
    bookDao.addBook(book, callback);

  }else{  //update
    bookDao.updateBook(book,callback);
  }

});

routes.delete('/book/:id', function(req, res){
  bookDao.removeBook(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Book Failed!');
    }
    res.status(201);
    res.send('Delete Book Successful!');
  });
});

module.exports = routes;
