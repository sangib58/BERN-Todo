import { useState } from "react";
import Navigation from "../components/Navigation"

const UpdateTask=({state})=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };
  const updateTask=async(event)=>{
      try {
          event.preventDefault()
          const {contract,account}=state
          const taskId=document.querySelector('#taskId').value
          const taskName=document.querySelector('#taskName').value
          const taskDate=document.querySelector('#taskDate').value

          const res=await fetch('http://localhost:3000/api/ethereum/update-task',{
              method:'POST',
              headers:{
                  'content-type':'application/json'
              },
              body:JSON.stringify({taskDate:taskDate})
          })

          const data=await res.json()
          //console.log(data)
          if(data.status===200){
              await contract.methods.updateTask(taskId,taskName,taskDate).send({from:account})
              setModalContent(
                `Task ID ${taskId} updated with task name ${taskName} and date ${taskDate}`
              );
              setModalVisible(true);
          }else{
              throw new Error("Task cannot be updated because of date clash")
          }
      } catch (error) {
          console.error(error)
          setModalContent("Task cannot be updated");
          setModalVisible(true);
      }
    }

    return(
      <>
        <Navigation />
        <div className="update_task todo_btn">
          <form onSubmit={updateTask}>
            <label>
              ID:
              <input id="taskId" />
            </label>
            <label>
              Name:
              <input id="taskName" />
            </label>
            <label>
              Date:
              <input id="taskDate" type="date" />
            </label>
            <button type="submit">Update Task</button>
          </form>
  
          {modalVisible && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <p>{modalContent}</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
}

export default UpdateTask