const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const models = {};

// Define the base paths
const modelsDir = __dirname;  // `/mongodb/models`
const schemasDir = path.join(__dirname, "../schemas");  // `/mongodb/schemas`

fs.readdirSync(modelsDir).forEach(file => {
    if (file !== "index.js" && file.endsWith(".js")) {
        const modelName = file.replace(".js", "");  // Extract model name

        // Load the corresponding schema from `/mongodb/schemas`
        const schemaPath = path.join(schemasDir, `${modelName}Schema.js`);

        if (fs.existsSync(schemaPath)) {  // Ensure schema exists before loading
            const schema = require(schemaPath);
            models[modelName] = mongoose.model(modelName, schema);
        } else {
            console.warn(`⚠️ Schema not found for model: ${modelName}`);
        }
    }
});

module.exports = models;  // ✅ Export all dynamically loaded models
