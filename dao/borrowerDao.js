var db = require('./db');

exports.getAllBorrowers = function(cb){
    db.query('select * from lms.tbl_borrower',cb);
}

exports.getExactBorrowers = function(borrowerId, cb){
    db.query('select * from lms.tbl_borrower where card_no = ?', [borrowerId], cb);
}

exports.addBorrower = function(borrower, cb){
    db.beginTransaction(function(err){
        if(err){
            cb(err,null);
        }
        db.query('insert into lms.tbl_borrower(borrower_name, borrower_address, borrower_phone) value(?,?,?)',[borrower.borrower_name, borrower.borrower_address, borrower.borrower_phone],function(err, res){
            if(err){
                db.rollback(cb);
            }
            db.commit(cb);
        });
    });
}

exports.deleteBorrower = function(borrowerId,cb){
    db.query('delete from lms.tbl_borrower where card_no = ?',[borrowerId],cb);
}

exports.updateBorrower = function(borrower, cb){
    db.beginTransaction(function(err){
        if(err){
            cb(err,null);
        }
        db.query('update lms.tbl_borrower set borrower_name = ?, borrower_address = ?, borrower_phone = ? where card_no = ?',[borrower.borrower_name, borrower.borrower_address, borrower.borrower_phone, borrower.card_no],function(err,res){
            if(err){
                db.rollback(cb);
            }
            db.commit(cb);
        })
    })
}

