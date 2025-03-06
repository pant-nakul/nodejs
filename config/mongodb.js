const mongoose = require("mongoose");


const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Mongo Connection Error:", error);
        process.exit(1); // Stop the app if MongoDB connection fails
    }
};

// Export the function to connect MongoDB
module.exports = connectMongoDB;
