'use strict'

const users = (sequelize, DataTypes) => sequelize.define('usera', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = users;