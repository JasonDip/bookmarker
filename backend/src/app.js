/* Load environment variables */
require("./Config/env");

/*  Configure Express server  */
const server = require("./Config/express");

/*  Connect to database  */
require("./Config/mongoose")
    .then(() => {
        console.log("Connected to MongoDB database.");
    })
    .catch(e => {
        console.log(
            "[ERROR] Unable to connect to the MongoDB database: " + e.message
        );
    })
    .then(() => {
        /*  begin listening on server  */
        const port = process.env.PORT || 3000;
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}.`);
        });
    });
