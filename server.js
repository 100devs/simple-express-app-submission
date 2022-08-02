const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const dbConnectionString = process.env.DB_String
let db,
    dbName = '',
    collection