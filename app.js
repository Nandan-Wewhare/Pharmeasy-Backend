const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv/config");
const errorHandler = require("./helpers/error-handler.helper");

const port = process.env.PORT;
const databaseConnection = process.env.DATABASE;
const api = process.env.API_URL;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(errorHandler);

const authRouter = require("./routes/auth.route");
const miscRouter = require("./routes/misc.route");
const categoryRouter = require("./routes/category.route");
const reviewRouter = require("./routes/review.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");

app.use(`${api}/misc`, miscRouter);
app.use(`${api}/auth`, authRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/reviews`, reviewRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/cart`, cartRouter);

mongoose.connect(databaseConnection).then(() => console.log("DB Connected"));
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
