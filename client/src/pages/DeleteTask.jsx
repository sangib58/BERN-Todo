import { useState } from "react";
import Navigation from "../components/Navigation";

const DeleteTask = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };
  const deleteTask = async (event) => {
    try {
      event.preventDefault();
      const { contract, account } = state;
      const taskId = document.querySelector("#taskId").value;

      const res = await fetch(
        `http://localhost:3000/api/ethereum/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      //console.log(data)

      if (data.status === 200) {
        await contract.methods.deleteTask(taskId).send({ from: account });
        setModalContent(`Task Id ${taskId} deleted successfully`)
        setModalContent(true)
      } else {    
        setModalContent('This task not allowed to delete')
        setModalVisible(true)
        //throw new Error();
      }
    } catch (error) {
      console.error(error);
      setModalContent('Some Error occured! Try again later')
      setModalVisible(true)
    }
  };

  return (
    <>
      <Navigation />
      <div className="update_task todo_btn">
        <form onSubmit={deleteTask}>
          <label>
            ID:
            <input type="text" id="taskId" />
          </label>
          <button type="submit">Delete Task</button>
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
};

export default DeleteTask;
