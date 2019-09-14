const express = require('express');
const app = express();
const routes = require('./routes')(app);

app.get('/', (req,res) => {
    res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));