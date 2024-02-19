const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Kunal@1234de', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;