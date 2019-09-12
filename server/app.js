var mongoose = require('mongoose');
mongoose.connect(config.db, {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));