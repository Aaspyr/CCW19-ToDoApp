require('express-async-errors');
const express = require('express');
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');

require("./startup/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use("/api/auth", auth);

//CORS handling
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on localhost:${port}...`));