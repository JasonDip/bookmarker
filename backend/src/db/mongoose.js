const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB database.");
    })
    .catch(e => {
        console.log("Unable to connect to the MongoDB database.");
    });
