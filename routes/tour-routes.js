const express = require("express");
const tour_controller = require("../Controllers/tour_controller.js");
const router = express.Router();

//router.param("id", (req, res, next, val) => {
// console.log(`${val}`);
// next();
//});
router.param("id", tour_controller.checkID);
router
  .route("/")
  .get(tour_controller.get_all_tours)
  .post(tour_controller.checkBody, tour_controller.add_tour);

router
  .route("/:id")
  .get(tour_controller.get_tour)
  .patch(tour_controller.patch_tour)
  .delete(tour_controller.delete_tour);

module.exports = router;
