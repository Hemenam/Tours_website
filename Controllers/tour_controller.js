const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
);
exports.checkID = (req, res, next, val) => {
  console.log(`The id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};
exports.get_all_tours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.get_tour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  return res.status(200).json({
    satus: "success",
    data: {
      tour,
    },
  });
};
exports.add_tour = (req, res) => {
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
exports.patch_tour = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      tour: "<Has been updated>",
    },
  });
};
exports.delete_tour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
