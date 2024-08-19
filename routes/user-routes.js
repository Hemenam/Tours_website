const express = require("express");

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

const router = express.Router();
router.route("/").get(get_all_user).post(add_user);

router.route(":id").get(get_user).patch(patch_user).delete(delete_user);

module.exports = router;
