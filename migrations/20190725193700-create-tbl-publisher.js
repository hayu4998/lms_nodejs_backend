'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_publisher', {
      publisher_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      publisher_name: {
        type: Sequelize.STRING
      },
      publisher_address: {
        type: Sequelize.STRING
      },
      publisher_phone: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tbl_publisher');
  }
};