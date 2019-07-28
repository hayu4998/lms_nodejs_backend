var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from lms.tbl_author', function(err, result) {
        cb(err, result);
      });
};

exports.getExactAuthor = function(authorId, cb){
  db.query('select * from lms.tbl_author where author_id = ?', [authorId], function(err,res){
    cb(err,result);
  })
}

exports.getAuthorByBookId = function(bookId,cb){
  db.query('select * from lms.tbl_author where author_id in (select author_id from lms.tbl_book_authors where book_id = ?)',
  [bookId], function(err,result){
    cb(err,result);
  })
}

exports.removeAuthor = function(authorId,cb){
  db.beginTransaction(function(err){
    if(err){
      cb(err,null)
    }
    db.query('delete from lms.tbl_author where author_id = ?',[authorId],function(err,res){
      if(err){
        db.rollback(function(err,res){
          cb(err,null);
        });
      }
      db.commit(function(err,res){
        cb(err,res);
      });
    });
  });
}

exports.addAuthor = function(author,cb){
  db.beginTransaction(function(err){
    if(err){
      cb(err,null);
    }

    db.query('insert into lms.tbl_author(author_name) value(?)',[author.author_name], function(err,res){
      if(err){
        db.rollback(function(err,res){
          cb(err,null);
        });
      }
      db.commit(function(err,res){
        cb(err,res);
      });
    });
  });
}

exports.updateAuthor = function(author,callback){
  db.beginTransaction(function(err){
    if(err){
      callback(err,null);
    }
    db.query('update lms.author set author_name = ? where author_id = ?',[author.author_name, author.author_id],function(err,res){
      if(err){
        db.rollback(function(err,res){
          callback(err,res);
        });
      }
      db.commit(function(err,res){
        callback(err,res);
      });
    });
  });
}