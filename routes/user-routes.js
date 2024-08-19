const express = require("express");
const user_controller = require("./../Controllers/user_controller");
const router = express.Router();
router
  .route("/")
  .get(user_controller.get_all_user)
  .post(user_controller.add_user);

router
  .route(":id")
  .get(user_controller.get_user)
  .patch(user_controller.patch_user)
  .delete(user_controller.delete_user);

module.exports = router;
