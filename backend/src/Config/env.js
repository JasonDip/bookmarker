let loadEnv = require("dotenv").config();

if (loadEnv.error) {
    throw loadEnv.error;
}

if (!loadEnv) {
    throw new Error(".env was not loaded.");
}
