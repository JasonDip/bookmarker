/* Load environment variables */
require("./Config/env");

/*  Connect to database  */
require("./Config/mongoose");

/*  Configure Express server  */
const server = require("./Config/express");

/*  begin listening on server  */
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
