// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ToDo{
    struct Task{
        uint id;
        string Task;
        string Date;
    }

    address owner;
    //Task task;
    mapping(uint=>Task) tasks;
    uint taskId=1;

    modifier checkId(uint id){
        require(id!=0 && id<taskId,"Invalid id");
        _;
    }

    modifier checkOwner(){
        require(owner==msg.sender,"Invalid Owner");
        _;
    }

    constructor(){
        owner=msg.sender;
    }

    function createTask(string calldata _task,string calldata _date) public {
        tasks[taskId]=Task(taskId,_task,_date);
        taskId++;
    }

    function updateTask(uint _taskId,string calldata _task,string calldata _date) checkId(_taskId) public {
        tasks[_taskId]=Task(_taskId,_task,_date);
    }

    function allTask() public view returns (Task[] memory){
        Task[] memory tasksList=new Task[](taskId-1);
        for (uint i=0; i<taskId-1; i++) 
        {
            tasksList[i]=tasks[i+1];
        }
        return tasksList;
    }

    function viewTask(uint _taskId) public view returns (Task memory){
        return tasks[_taskId];
    }

    function deleteTask(uint _taskId) checkId(_taskId) public {
        delete tasks[_taskId];
    }
}