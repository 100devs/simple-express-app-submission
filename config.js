const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected `.blue + `${connect.connection.host}`.magenta)
    } catch (error) {
        console.log(`Error: `.bgGray.white + `${error.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB