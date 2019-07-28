var db = require('./db');

exports.getAllPublishers = function(cb){
    db.query('select * from lms.tbl_publisher', function(err, result) {
        cb(err, result);
      });
};

exports.getExactPublisher = function(publisherId, cb){
  db.query('select * from lms.tbl_publisher where publisher_id = ?', [publisherId], function(err,res){
    cb(err,result);
  })
}

exports.removePublisher = function(publisherId,cb){
  db.beginTransaction(function(err){
    if(err){
      cb(err,null)
    }
    db.query('delete from lms.tbl_publisher where publisher_id = ?',[publisherId],function(err,res){
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

exports.addPublisher = function(publisher,cb){
  db.beginTransaction(function(err){
    if(err){
      cb(err,null);
    }

    db.query('insert into lms.tbl_publisher(publisher_name, publisher_address, publisher_phone) value(?,?,?)',[publisher.publisher_name, publisher.publisher_address, publisher.publisher_phone], function(err,res){
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

exports.updatePublisher = function(publisher,callback){
  db.beginTransaction(function(err){
    if(err){
      callback(err,null);
    }
    db.query('update lms.publisher set publisher_name = ?, publisher_address = ?, publisher_phone = ? where publisher_id = ?',[publisher.publisher_name, publisher.publisher_address, publisher.publisher_phone, publisher.publisher_id],function(err,res){
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