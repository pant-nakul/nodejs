console.log("Starting node server");

const express = require("express");
const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const connectMongoDB = require("./config/mongodb"); // ✅ Import MongoDB Configuration
const {logRequests} = require("./middlewares")
const app = express();
const port = 8000;

// Connect to MongoDB
connectMongoDB(); // ✅ Call MongoDB connection function

// Middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logRequests("app.log") );

// App Routes
app.use("/", require("./routes/global"));
app.use("/api", require("./routes"));

// Initialize Apollo Server
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(port, () => {
        console.log(`🚀 Server started on port ${port}`);
        console.log(`🎯 GraphQL API available at http://localhost:${port}/graphql`);
    });
}

startServer().catch(err => console.error("Error starting server:", err));
