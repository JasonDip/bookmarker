const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});

store.on("error", function(error) {
    throw new Error("[ERROR] Error initializing session store: " + error);
});

// TODO: add "secure: true" cookie setting after setting up https
module.exports = session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 2.592e9
    }
});
