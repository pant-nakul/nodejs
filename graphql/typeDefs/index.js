const typeDefs = `
type Query {
    about: String!
}
type Mutation {
    setAboutMessage(message: String!): String
}
`;

module.exports = typeDefs;