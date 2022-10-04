const mongoose = require('mongoose')

//When working with mongoose we are dealing with promises
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log(`MongoDB Connected ${conn.connection.host}`)
    }catch (err) {
        console.log(err)
        process.exit(1) //exit with failure
    }
}

module.exports = connectDB