const express = require('express');
const tourController = require('../Controllers/tourController');

const router = express.Router();

//router.param("id", (req, res, next, val) => {
// console.log(`${val}`);
// next();
//});
//router.param('id', tourController.checkID);
router
  .route('/top5-cheap')
  .get(tourController.aliasCheapTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
