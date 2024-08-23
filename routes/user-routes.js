const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();
router
  .route('/')
  .get(userController.get_all_user)
  .post(userController.add_user);

router
  .route(':id')
  .get(userController.get_user)
  .patch(userController.patch_user)
  .delete(userController.delete_user);

module.exports = router;
