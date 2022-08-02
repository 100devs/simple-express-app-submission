const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_STRING, {
            dbName: 'dishes',
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB


/*
Helpful article: https://mrvautin.com/re-use-mongodb-database-connection-in-routes/
*/
