const express = require("express");
const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);

const get_all_tours = (req, res) => {
  console.log(req.request_time);
  res.status(200).json({
    status: "Success",
    requestedAt: req.request_time,
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

const router = express.Router();

router.route("/").get(get_all_tours).post(add_tour);

router.route("/:id").get(get_tour).patch(patch_tour).delete(delete_tour);

module.exports = router;
