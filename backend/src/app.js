require("dotenv").config();
const server = require("./server/express");

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
