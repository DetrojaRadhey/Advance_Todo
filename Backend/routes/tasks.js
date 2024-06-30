const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.js");

// to get all tasks
router.get("/",taskController.getAllTasks);

// to add a new task
router.post("/add",taskController.addTask);

// to delete a task
router.delete("/delete/:id",taskController.deleteTask);

// to update a state of task
router.put("/changestate/:id",taskController.updateState);

// to update a single task
router.put("/update/:key",taskController.updateTask);

// to set all as incompleted
router.put("/setFalse",taskController.markAllAsIncompleted);

// to set all as completed
router.put("/setTrue",taskController.maerkAllAsCompleted);

// to search task
router.put("/search",taskController.searchTask);

module.exports = router;