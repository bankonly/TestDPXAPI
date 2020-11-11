const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load .env files
dotenv.config();

const env = process.env;
const db = `${env.DB_DRIVER}://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

const InitialDatabase = () =>
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      replicaSet: "rs",
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

    
exports.InitialDatabase = InitialDatabase;
