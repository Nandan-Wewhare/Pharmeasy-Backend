const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./helpers/error-handler.helper");
const authJwt = require("./helpers/jwt.helper");
require("dotenv/config");

const port = process.env.PORT;
const databaseConnection = process.env.DATABASE;
const api = process.env.API_URL;

app.use(morgan("tiny"));
app.use(express.json());
// app.use(authJwt());
app.use(errorHandler);

app.get(`/`, (req, res) => res.send("Running"));

mongoose.connect(databaseConnection).then(() => console.log("DB Connected"));
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
