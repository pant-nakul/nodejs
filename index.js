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
const Url = require("./models/Url");

// Connect to MongoDB
connectMongoDB(); // ✅ Call MongoDB connection function

// Middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logRequests("app.log") );
app.use(express.json() );
app.set("view engine", "ejs");
app.set("views", path.resolve( "./views"));

// App Routes
app.use("/", require("./routes/global"));
app.use("/api", require("./routes"));

app.get("/:shortId", async (req, res) => {
    console.log(req.params.shortId);
    const shortId = req.params.shortId;
    const url = await Url.findOneAndUpdate({shortId},
        {$push: {visitHistory : {timestamp : Date.now()}}});
    res.redirect(url.redirectUrl);
})

// Initialize Apollo Server
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(port, () => {
        console.log(`🚀 Server started on port ${port}. Visit: http://localhost:${port}`);
        console.log(`🎯 GraphQL API available at http://localhost:${port}/graphql`);
    });
}

startServer().catch(err => console.error("Error starting server:", err));
