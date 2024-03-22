import React from 'react'
import { Link, useLocation  } from 'react-router-dom'
import listImage from './images/list.png'
import addImage from './images/add.png'
import homeImage from './images/home.png'

const Sidebar = () => {
  const location = useLocation();
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-light my-1" style={{ width: '280px', height: '90vh' }}>
    <ul class="nav nav-pills flex-column mb-auto">
    <li>
        <Link to="/" className={location.pathname === '/' ? 'nav-link active text-dark' : 'nav-link text-dark'}>
          {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
          <img src={homeImage} class="mx-2" width="16" height="16"/>
          Home
        </Link>
      </li>

      <li>
        <Link to="addtask" className={location.pathname === '/addtask' ? 'nav-link active text-dark' : 'nav-link text-dark'}>
          {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg> */}
          <img src={addImage} class="mx-2" width="16" height="16"/>
          Add Task
        </Link>
      </li>
      
      <li>
        <Link to="tasklist" className={location.pathname === '/tasklist' ? 'nav-link active text-dark' : 'nav-link text-dark'}>
          {/* <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg> */}
          <img src={listImage} class="mx-2" width="16" height="16"/>
          TaskList
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar
