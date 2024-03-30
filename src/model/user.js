const {DataTypes} = require('sequelize');
const sequelize = require('../dbConnector');

const User = sequelize.define('users_chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    }
});

module.exports = User;