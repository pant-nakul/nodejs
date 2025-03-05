const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const models = {};

// Define the models directory path
const modelsDir = __dirname;  // `/mongodb/models`

fs.readdirSync(modelsDir).forEach(file => {
    if (file !== "index.js" && file.endsWith(".js")) {
        const modelName = file.replace(".js", "");  // Extract model name
        const model = require(path.join(modelsDir, file));  // Load the model

        // Ensure it's a valid Mongoose model before storing it
        if (model.prototype instanceof mongoose.Model) {
            models[modelName] = model;
        } else {
            console.warn(`⚠️ Skipping ${file}: Not a valid Mongoose model.`);
        }
    }
});

module.exports = models;  // ✅ Export all dynamically loaded models
