const {Sequelize} = require("sequelize")

module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect:"postgres",
        host: "localhost",
        port: process.env.PORT
    }
)