var routes = require('express').Router();
var db = require('../dao/db');
var borrowerDao = require('../dao/borrowerDao');

//read all borrower
routes.get('/borrower', function(req,res){
    borrowerDao.getAllBorrowers(function(err,result){
        if(err){
            throw err;
        }
        res.setHeader('Content-Type','application/json');
        res.send(result);
    });
})

//read exact borrower
routes.get('/borrower/:id',function(req,res){
    var borrowerId = req.params.id;
    borrowerDao.getExactGere(borrowerId, function(err,result){
        if(err){
            throw err;
        }
        res.setHeader('Content-Type','application/json');
        res.send(result);
    });
})

//add, update borrower
routes.post('/borrower',function(req,res){
    var borrower = req.body;
    var callback = function(err,result){
        if(err){
            res.status(400);
            res.send('operation on borrower failed');
        }
        res.status(201);
        res.send('operation on borrower successed');
    }
    if(borrower.id == null){   //add
        borrowerDAO.addBorrower(borrower,callback);
    }else{  //update
        borrowerDAO.updateBorrower(borrower,callback);
    }
})

//delete borrower
routes.delete('/borrower/:id',function(req, res){
    var borrowerId = req.params.id;
    borrowerDao.removeBorrower(borrowerId,function(err,result){
        if(err){
            res.status(400);
            res.send('delete borrower failed');
        }
        res.status(201);
        res.send('delete borrower successed');
    });
})

module.exports= routes;
