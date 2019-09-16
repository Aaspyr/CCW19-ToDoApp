const mongoose = require("mongoose");

module.exports = connectToDatabase = () => {
  // Podmienić link na prawidłowy z uzupełnionymi polami do właściwej bazy danych
    const db = 'mongodb+srv://(nazwaUzytkownika):(haslo)@(cluster).mongodb.net/(nazwaBazyDanych)?retryWrites=true&w=majority'
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