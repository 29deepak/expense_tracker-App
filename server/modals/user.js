const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isPremiumUser: {
        type: Sequelize.BOOLEAN,
    }
});

module.exports = User;