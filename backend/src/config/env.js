const path = require("path");
let loadEnv = require("dotenv").config({
    path: path.join(__dirname, "./.env"),
});

if (loadEnv.error) {
    // throw loadEnv.error;
    console.log(".env was not loaded.");
}

if (!loadEnv) {
    // throw new Error(".env was not loaded.");
    console.log(".env was not loaded.");
}
