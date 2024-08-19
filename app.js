//Reauirements
const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

//Middlewares
app.use(express.json());
app.use(morgan("dev"));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
);

//Route Handlers
const get_all_tours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours,
    },
  });
};
const get_tour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  return res.status(200).json({
    satus: "success",
    data: {
      tour,
    },
  });
};
const add_tour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const patch_tour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour: "<Has been updated>",
    },
  });
};
const delete_tour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
const get_all_user = (req, res) => {
  res.status(404).json({
    status: "error",
    data: null,
  });
};
const get_user = (req, res) => {
  res.status(404).json({
    status: "error",
    data: null,
  });
};
const add_user = (req, res) => {
  res.status(404).json({
    status: "error",
    data: null,
  });
};
const patch_user = (req, res) => {
  res.status(404).json({
    status: "error",
    data: null,
  });
};
const delete_user = (req, res) => {
  res.status(404).json({
    status: "error",
    data: null,
  });
};

//Routing
app.route("/api/v1/tours").get(get_all_tours).post(add_tour);

app
  .route("/api/v1/tours/:id")
  .get(get_tour)
  .patch(patch_tour)
  .delete(delete_tour);

app.route("/api/v1/users").get(get_all_user).post(add_user);

app
  .route("/api/v1/users/:id")
  .get(get_user)
  .patch(patch_user)
  .delete(delete_user);

//Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`Natours is running on ${port}`);
});
