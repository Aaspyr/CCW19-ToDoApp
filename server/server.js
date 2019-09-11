const express = require('express');
const server = express();

server.get('/', (req,res) => {
    res.send('hello');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}...`));