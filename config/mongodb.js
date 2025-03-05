const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/nodejs"; // Replace with your DB URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Mongo Connection Error:", error);
        process.exit(1); // Stop the app if MongoDB connection fails
    }
};

// Export the function to connect MongoDB
module.exports = connectDB;
