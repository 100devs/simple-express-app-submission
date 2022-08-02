const mysql = require('mysql2');
const PORT = process.env.DB_PORT;
const XPROTOCOLPORT = process.env.DB_XPROTOCOLPORT;
const ROOT_PASSWORD = process.env.DB_ROOT_PASSWORD;

const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const WINDOWS_SERVICE_NAME = process.env.WINDOWS_SERVICE_NAME_MYSQL;
const DBNAME = process.env.DB_NAME;
const POOLSIZE = 100;

function Connection() {
    console.log("Trying login to database with these credentials: ");
    console.log("Database Host:", HOST);
    console.log("Database Username:", USERNAME);
    console.log("Database Password:", PASSWORD);

    this.pool = null;
    this.init = function() {
        this.pool = mysql.createPool(
            {
                connectionLimit: POOLSIZE,
                host: HOST,
                database: 'MyPosts',
                user: USERNAME,
                password: PASSWORD,
                debug: false,
                multipleStatements: true
            }
        )
    }
    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
    this.executequery = function(querystring, callback) {
        this.executepromise();
    }
    this.executepromise = function() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, connection) {
                if(err) {
                    return reject(err);
                }
                resolve(connection);
            });
        })
    }
    console.log("Connection: " + this.pool);
}
module.exports = new Connection();