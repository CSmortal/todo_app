// This file configures how we are going to connect to the db
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "PJf0r3v3r!",
    host: "localhost",
    port: 5432, // default port for postgres
    database: "perntodo"
})

module.exports = pool;