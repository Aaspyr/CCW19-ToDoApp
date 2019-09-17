const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes')(app);
const config = require('./config');

mongoose.connect(config.db, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//CORS handling
app.use(cors());

app.get('/', (req,res) => {
    res.send('hello');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));





