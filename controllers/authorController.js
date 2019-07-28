var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

//get all authors
routes.get('/author', function (req, res) {
  authorDao.getAllAuthors(function (error, result) {
    if (error) throw error;
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  });
});

//get authors with bookId
routes.get('/authorOfBook/:id', function (req, res) {
  authorDao.getAuthorByBookId(req.params.id, function (error, result) {
    if(error) throw error;
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  })
})

//add,update operations
routes.post('/author', function (req, res) {
  var author = req.body;
  var callback = function (err, result) {
    if (err) {
      res.status(400);
      res.send('operation failed');
    }
    res.status(201);
    res.send('operation successed');
  }

  if (author.id != null) { // update
    authorDao.updateAuthor(author, callback);
  } else { //add
    authorDao.addAuthor(author, callback);
  }
})

//delete
routes.delete('/author/:id', function (req, res) {
  authorDao.removeAuthor(req.params.id, function (err, result) {
    if (err) {
      res.status(400);
      res.send('Delete author failed');
    }
    res.send('Delete author Successful');
  });
})
module.exports = routes;
