const mongoose = require("mongoose");

module.exports = connectToDatabase = () => {
  const db = 'mongodb+srv://CCW19-ToDoApp:qJtLUU6bxG@cluster0-nvlyd.mongodb.net/test?retryWrites=true&w=majority';
  
  mongoose
    .connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => console.log(`Connected successfully...`));
};