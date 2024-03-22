import React, {useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const TaskList = ({tasks,deleteTask,updateTask}) => {
  const navigate = useNavigate();

  const [taskData,setTaskData] = useState({id: '', task: "", category: "", date: ""});
  const [selectedTasks, setSelectedTasks] = useState([]);
  const buttonRef = useRef(null);
  const closeRef = useRef(null);

  const handleButtonClick = (curTask) => {
    buttonRef.current.click();
    setTaskData({id: curTask._id, task: curTask.task, category: curTask.category, date: curTask.date});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleUpdate = () => {
    updateTask(taskData);
    closeRef.current.click();
  }

  const handleCheckboxChange = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);

    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteAll = () => {
    // Implement logic to delete all selected tasks
    selectedTasks.forEach((taskId) => deleteTask(taskId));

    // Clear the selected tasks
    setSelectedTasks([]);
  };

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, [localStorage.getItem('token')]);

  return (
  <div className='container my-2'>
    <table class="table" style={{height: "10px"}}>
  <thead>
    <tr>
      <th scope="col">Select</th>
      <th scope="col">Task</th>
      <th scope="col">Category</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      tasks.map((task)=>(
      <tr>
      {/* <th scope="row">1</th> */}
      <td><input type="checkbox" checked={selectedTasks.includes(task._id)} onChange={() => handleCheckboxChange(task._id)} /></td>
      <td>{task.task}</td>
      <td>{task.category}</td>
      <td>{task.date}</td>
      <td>
      <button type="button" onClick={()=>handleButtonClick(task)} class="btn btn-primary mr-sm-2">Update</button>
      <button type="button" class="btn btn-danger" onClick={()=>deleteTask(task._id)}>Delete</button>
      </td>
      </tr>
      ))
    }
  </tbody>
</table>

<button
        type="button"
        className="btn btn-danger"
        onClick={handleDeleteAll}
        disabled={selectedTasks.length === 0}
      >
        Delete All
</button>

<button type="button" ref={buttonRef} class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form className='container my-3'>
  <div class="form-group">
    <label for="exampleFormControlInput1">Add Task</label>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your Task" name="task" value={taskData.task} onChange={handleChange}/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1" name="category" value={taskData.category} onChange={handleChange}>
      <option>frontend</option>
      <option>backend</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Date</label>
    <input type="date" class="form-control" id="exampleFormControlInput1" name="date" value={taskData.date} onChange={handleChange}/>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" ref={closeRef} class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handleUpdate} >Save</button>
      </div>
    </div>
  </div>
</div>
  </div>
  )
}

export default TaskList