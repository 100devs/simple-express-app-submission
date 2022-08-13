const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true
        })
        console.log(`mongodb connected to ${connect.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
module.exports = connectDB