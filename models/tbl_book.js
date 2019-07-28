'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_book = sequelize.define('tbl_book', {
    book_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    publisher_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  tbl_book.associate = function(models) {
    // associations can be defined here
  };
  return tbl_book;
};