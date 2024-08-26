const {checkDateClash,checkPriority}=require('../models/tasks.js')
const {contract}=require('../contract/contract.js')

const createTask=async (req, res) => {
    try {
      const { taskDate } = req.body;
      //console.log(req.body)
      const task = await checkDateClash(taskDate);
      //console.log(task)
  
      if (task !== "No Task Found") {
        res
          .status(409)
          .json({ status: 409, message: "Date Clash: Task can not be added" });
      } else {
        res.status(200).json({ status: 200, message: "Task can be added" });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: "Some errors occurs" });
      console.error(error);
    }
  }
const updateTask=async (req, res) => {
    try {
      const { taskDate } = req.body;
      const task = await checkDateClash(taskDate);
  
      if (task !== "No Task Found") {
        res
          .status(409)
          .json({ status: 409, message: "Date Clash: Task can not be updated" });
      } else {
        res.status(200).json({ status: 200, message: "Task can be updated" });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: "Some errors occurs" });
      console.error(error);
    }
  }
const deleteTask=async (req, res) => {
    try {
      const { taskId } = req.params;
      const isTrue = await checkPriority(taskId);
  
      if (isTrue) {
        res
          .status(403)
          .json({
            status: 403,
            message: "This is a priority task. can not be deleted",
          });
      } else {
        res.status(200).json({ status: 200, message: "Task can delete" });
      }
    } catch (error) {
      console.log(error);
    }
  }
const viewTask=async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await contract.methods.viewTask(taskId).call();
  
      const { id, Task, Date } = task;
      const numId = Number(id);
      const taskObj = {
        id: numId,
        name: Task,
        date: Date,
      };
      res.status(200).json({ status: 200, taskObj, message: "Task exists" });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "Some issues found or task not exists" });
      console.log(error);
    }
  }
const viewAllTask=async (req, res) => {
    try {
      const tasks = await contract.methods.allTask().call();
      if (tasks.length <= 0) {
        res.status(404).json({ status: 404, message: "No task exists" });
      } else {
        const taskList = tasks.map(({ id, Task, Date }) => {
          const taskId = Number(id);
          return { id: taskId, name: Task, date: Date };
        });
        res.status(200).json({ status: 200, taskList, message: "All tasks" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  module.exports={
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    viewAllTask,
  }
