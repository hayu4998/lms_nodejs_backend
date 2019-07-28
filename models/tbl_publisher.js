'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_publisher = sequelize.define('tbl_publisher', {
    publisher_id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publisher_name: DataTypes.STRING,
    publisher_address: DataTypes.STRING,
    publisher_phone: DataTypes.INTEGER
  }, {
    freezeTableName:true,
    timestamps:false
  });
  tbl_publisher.associate = function(models) {
    // associations can be defined here
  };
  return tbl_publisher;
};