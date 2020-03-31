/* Load environment variables */
require("./config/env");

/*  Configure Express server  */
const server = require("./server/express");

(async () => {
    /*  Connect to database  */
    try {
        await require("./db/mongoose");
        console.log("Connected to MongoDB database.");
    } catch (e) {
        console.log(
            "[ERROR] Unable to connect to the MongoDB database: " + e.message
        );
    }

    /*  begin listening on server  */
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
})();
