const express = require("express");
const cors = require("cors");
import http from "http";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credential: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on https://localhost:8080/");
});

const MONGO_URL =
  "mongodb+srv://mangalaicc:5jENCAys6poqBH8w@rest-api-ts.wlbf0a3.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connected Successfully !!!');
});

mongoose.connection.on("error", (error: Error) => console.log(error));
