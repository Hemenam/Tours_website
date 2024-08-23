//const fs = require('fs');

const Tour = require('../Models/tourModel');

//const tours = JSON.parse(
//  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`),
//);
exports.aliasCheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,prie,ratingAverage,summary,dificulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //Filtering
    const allqueries = { ...req.query };
    const restrictedqueries = ['limit', 'page', 'sort', 'fields'];
    restrictedqueries.forEach((el) => delete allqueries[el]);
    //Advanced filtering
    let queryStr = JSON.stringify(allqueries);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortQuery = req.query.sort.split(',').join(' ');
      query = query.sort(sortQuery);
    } else {
      query = query.sort('-createdAt');
    }
    //Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTour = await Tour.countDocuments();
      if (skip > numTour) {
        throw new Error('This page does not exist');
      }
    }

    const allTours = await query;
    res.status(200).json({
      status: 'Success',

      results: allTours.length,
      data: {
        tours: allTours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      satus: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',

      message: err,
    });
  }
};
exports.patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //to check if type changes
    });
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',

      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',

      message: err,
    });
  }
};
