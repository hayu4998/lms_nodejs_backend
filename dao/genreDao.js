var db = require('./db');

exports.getAllGenres = function(cb){
    db.query('select * from lms.tbl_genre',cb);
}

exports.getExactGenres = function(genreId, cb){
    db.query('select * from lms.tbl_genre where genre_id = ?', [genreId], cb);
}

exports.addGenre = function(genre, cb){
    db.beginTransaction(function(err){
        if(err){
            cb(err,null);
        }
        db.query('insert into lms.tbl_genre(genre_name) value(?)',[genre.genre_name],function(err, res){
            if(err){
                db.rollback(cb);
            }
            db.commit(cb);
        });
    });
}

exports.deleteGenre = function(genreId,cb){
    db.query('delete from lms.tbl_genre where genre_id = ?',[genreId],cb);
}

exports.updateGenre = function(genre, cb){
    db.beginTransaction(function(err){
        if(err){
            cb(err,null);
        }
        db.query('update lms.tbl_genre set genre_name = ?',[genre_name],function(err,res){
            if(err){
                db.rollback(cb);
            }
            db.commit(cb);
        })
    })
}

