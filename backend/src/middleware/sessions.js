const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
});

store.on("error", function (error) {
    throw new Error("[ERROR] Error initializing session store: " + error);
});

const cookieOBj =
    process.env.NODE_ENV === "production"
        ? {
              httpOnly: true,
              maxAge: 2.592e9,
              secure: "true",
              sameSite: "none",
          }
        : {
              httpOnly: true,
              maxAge: 2.592e9,
              sameSite: "none",
          };

module.exports = session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: cookieOBj,
});
