const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});

store.on("error", function(error) {
    console.log("Error initializing session store: " + error);
});

module.exports = session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false
});
