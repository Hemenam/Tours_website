//Reauirements
const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const tour_router = require("./routes/tour-routes");
const user_router = require("./routes/user-routes");
//Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from middleware!");
  req.request_Time = new Date().toISOString();
  next;
});

//Route Handlers

app.use("/api/v1/tours", tour_router);
app.use("/api/v1/users", user_router);

//Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Natours is running on ${port}`);
});
