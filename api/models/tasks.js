const {contract}=require('../contract/contract.js')

const checkDateClash = async (taskDate) => {
    const tasks = await contract.methods.allTask().call();
    //console.log(tasks)
    const foundTask = tasks.find((task) => task.Date === taskDate);
    //console.log(foundTask)
  
    if (foundTask) {
      return foundTask.name;
    } else {
      return "No Task Found";
    }
  };
  
  const checkPriority = async (id) => {
    const tasks = await contract.methods.allTask().call();
    const result = tasks[id-1].Task.includes("Priority");
    //console.log(result)
    return result;
  };

  module.exports={
    checkDateClash,checkPriority
  }