const {DataTypes} = require('sequelize');
const sequelize = require('../dbConnector');
const User = require("./user");

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Message.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

module.exports = Message;
