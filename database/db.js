// importing necessary packages
const mongoose = require('mongoose');

// function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true, // Use the new URL string parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
    }
}

// export the function
module.exports = connectDB;
