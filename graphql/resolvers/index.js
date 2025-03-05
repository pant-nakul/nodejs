let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
}

function setAboutMessage(_, {message}){
    return aboutMessage = message;
}

module.exports =  {resolvers}