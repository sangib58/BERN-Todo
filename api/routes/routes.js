const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  viewTask,
  viewAllTask,
} = require("../controllers/controller.js");

const { directTask } = require("../controllers/insertTask.js");

router.route("/create-task").post(createTask);
router.route("/update-task").post(updateTask);
router.route("/delete-task/:taskId").delete(deleteTask);
router.route("/view-task/:taskId").get(viewTask);
router.route("/view-all-task").get(viewAllTask);
router.route("/create-task-direct").post(directTask);

module.exports = router;
