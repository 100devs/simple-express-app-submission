const Mongoose = require("mongoose")
const RemoteDB = 'mongodb+srv://nchlsparks:sGHAyxoZ3rWtlq81@cluster0.knox9.mongodb.net/?retryWrites=true&w=majority'
const connectDB = async () => {
    await Mongoose.connect(RemoteDB)
    .then(client => {
        console.log('MongoDB connection successful')
    })
}
module.exports = connectDB