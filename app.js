//Reauirements
const express = require("express");

const morgan = require("morgan");
const tour_router = require("./routes/tour-routes");
const user_router = require("./routes/user-routes");
const app = express();
//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//Route Handlers

app.use("/api/v1/tours", tour_router);
app.use("/api/v1/users", user_router);

//Starting the server
module.exports = app;
