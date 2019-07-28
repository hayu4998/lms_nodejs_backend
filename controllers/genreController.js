var routes = require('express').Router();
var db = require('../dao/db');
var genreDao = require('../dao/genreDao');

//read all genre
routes.get('/genre', function(req,res){
    genreDao.getAllGenres(function(err,result){
        if(err){
            throw err;
        }
        res.setHeader('Content-Type','application/json');
        res.send(result);
    });
})

//read exact genre
routes.get('/genre/:id',function(req,res){
    var genreId = req.params.id;
    genreDao.getExactGere(genreId, function(err,result){
        if(err){
            throw err;
        }
        res.setHeader('Content-Type','application/json');
        res.send(result);
    });
})

//add, update genre
routes.post('/genre',function(req,res){
    var genre = req.body;
    var callback = function(err,result){
        if(err){
            res.status(400);
            res.send('operation on genre failed');
        }
        res.status(201);
        res.send('operation on genre successed');
    }
    if(genre.id == null){   //add
        genreDAO.addGenre(genre,callback);
    }else{  //update
        genreDAO.updateGenre(genre,callback);
    }
})

//delete genre
routes.delete('/genre/:id',function(req, res){
    var genreId = req.params.id;
    genreDao.removeGenre(genreId,function(err,result){
        if(err){
            res.status(400);
            res.send('delete genre failed');
        }
        res.status(201);
        res.send('delete genre successed');
    });
})

module.exports= routes;
