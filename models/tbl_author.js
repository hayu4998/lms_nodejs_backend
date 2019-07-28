'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_author = sequelize.define('tbl_author', {
    author_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    }, 
    author_name: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
  });
  tbl_author.associate = function(models) {
    // associations can be defined here
  };
  return tbl_author;
};