// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Signup from "./Signup";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { useState, useEffect } from "react";
import Home from "./Home";

function App() {
  const [tasks,setTasks] = useState([]);
  const [user,setUser] = useState({});

  const fetchTasks = async () => {
    if (localStorage.getItem('token')) {
      const endpoint = localStorage.getItem('usertype') === "Agent User" ?
        'http://localhost:5000/task/getspecifictask' :
        'http://localhost:5000/task/getalltasks';
  
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          'token': localStorage.getItem('token')
        }
      });
  
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
  };

  const fetchUserInfo = async () => {
    if (localStorage.getItem('token')) {
    const response = await fetch(`http://localhost:5000/auth/userinfo`,{
      method: "GET",
      headers: {
        token: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  }
  }
  
  useEffect(() => {
    fetchTasks();
    fetchUserInfo();
  }, [localStorage.getItem('token')]);

  const createTask = async (taskData) => {
    const response = await fetch(`http://localhost:5000/task/createtask`, {
      method: "POST",
      headers: {
        'content-type' : 'application/json',
        token: localStorage.getItem('token')
      },
      body: JSON.stringify(taskData)
    });
    const data = await response.json();
    // console.log(data);
    const newTasks = [...tasks,data];
    setTasks(newTasks);
  }

  const deleteTask = async (delId) => {
    const response = await fetch(`http://localhost:5000/task/deletetask/${delId}`,{
      method: "DELETE",
      headers: {
        'content-type': 'applicatiom/json'
      }
    });
    const data = await response.json();
    console.log(data);

    const newTasks = tasks.filter((task)=>task._id!==delId)
    setTasks(newTasks);
  }

  const updateTask = async (taskData) => {
    const response = await fetch(`http://localhost:5000/task/updatetask/${taskData.id}`,{
      method: "PUT",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    const newTasks = JSON.parse(JSON.stringify(tasks));

    for(let index=0; index<newTasks.length; index++){
      const element = newTasks[index];
      if(element._id === taskData.id){
        newTasks[index].task = taskData.task;
        newTasks[index].category = taskData.category;
         setTasks(newTasks);
         break;
      }
    }
  }

  return (
    <>
      <Router>
        <Navbar setTasks={setTasks} user={user}/>
        <div className="d-flex">
        <Sidebar/>
        <Routes>
        <Route path='/' element={<Home user={user} />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/addtask' element={<AddTask createTask={createTask} />} />
          <Route path='/tasklist' element={<TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
