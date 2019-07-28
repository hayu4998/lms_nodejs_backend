var db = require('./db');
var adao = require('./authorDao');

class Database {
  constructor() {
      this.connection = db;
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}
var database = new Database();

//read all books
exports.getAllBooks = function(cb){
    db.query('select * from lms.tbl_book b join lms.tbl_publisher p on b.publisher_id = p.publisher_id ', function(err,res){
      if(err){
        cb(err,null);
      }
      cb(err,res);
    });

};

//read one book
exports.getExactBook = function(bookId, cb){
  db.query('select * from lms.tbl_book where book_id = ?',[bookId],function(err,res){
    cb(err,res);
  });
}

//add book

exports.addBook2 = function(book,cb){
  db.beginTransaction()
  database.query('insert into lms.tbl_book(title, publisher_id) values(?,?)', [book.title, book.publisher_id])
  .then((err,res)=>{
    if(err){
      throw err;
    }
    db.commit()
    return res
  })
  .then((res)=>{
    cb(null,res);
  })
  .then(()=>{
    database.close();
  })
  .catch((err) => {
    db.rollback();
    cb(err,null)
  })
}

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into lms.tbl_book(title, publisher_id) values(?,?)', [book.title, book.publisher_id], function(err, bookresult){
          if(err){
            db.rollback(function(err, res){
              cb(err, null);
            });
          } 

          // bookId = bookresult.insertId;
          // for(author in book.authors){
          //   console.log(author)
          //   if(author.author_id == null){
          //     db.query('insert into lms.tbl_author(author_name) value(?)', [author.author_name], function(err,res){
          //       if(err){
          //         db.rollback(function(err,res){
          //           cb(err,null);
          //         })
          //       }

          //       db.query('select LAST_INSERT_ID() from lms.tbl_author',[],function(err,authId){
          //         console.log(JSON.stringify(authId)+" "+JSON.stringify(bookId))
          //         db.query('insert into lms.tbl_book_authors(book_id, author_id) value(?,?)',[bookId,authId],function(err,res){
          //           if(err){
          //             db.rollback((err,res)=>{
          //               cb(err,null)
          //             })
          //           }
          //         })
          //       })
          //     })
          //   }else{
          //     db.query('insert into lms.tbl_book_authors(book_id, author_id) value(?,?)',[bookId, author.author_id], (err,res)=>{
          //       if(err){
          //         db.rollback((err, res)=>{
          //           cb(err,null)
          //         })
          //       }
          //     })
          //   }
          // }
        
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      })
};

//delete book
exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from lms.tbl_book where book_id = ?', [bookId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
}

//update book
exports.updateBook = function(book,callback){
  db.beginTransaction(function(err){
    if(err){
      callback(err,null);
    };
    db.query("update lms.tbl_book set title = ?, publisher_id = ? where book_id = ?",[book.title, book.publisher_id, book.book_id],function(err,res){
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