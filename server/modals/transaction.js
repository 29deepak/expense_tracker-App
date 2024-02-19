const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Transaction = sequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.NUMERIC,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    refrence: {
        type: Sequelize.STRING,
    },
    decription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Transaction;