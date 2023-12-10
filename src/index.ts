const express = require("express");
const cors = require("cors");
import http from "http";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");

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
    
})
