const mongoose = require('mongoose');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');

//CORS handling
app.use(cors());
require('./routes/routes')(app);

mongoose.connect(config.db, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
