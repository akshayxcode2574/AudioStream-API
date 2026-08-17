const mongoose = require('mongoose')    // Mongoose = Object Data Modeling ( ODM )

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to DB")
    } catch (error) {
        console.log("Database Connection Error",error)
    }
}

module.exports = connectDB