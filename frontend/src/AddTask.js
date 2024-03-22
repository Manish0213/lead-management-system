import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AddTask = ({createTask}) => {
  const navigate = useNavigate();
  const [taskData,setTaskData] = useState({task: "", category: "", date: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(taskData);
    setTaskData({task: "", category: "", date: ""});
  } 

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, [localStorage.getItem('token')]);

  return (
    <form className='container my-3' onSubmit={handleSubmit}>
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
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  )
}

export default AddTask
