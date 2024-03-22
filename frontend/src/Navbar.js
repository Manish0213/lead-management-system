import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setTasks,user}) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  // const [user,setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    setTasks([]);
    // showAlert("Logout Successfully","success");
    navigate('/login');
  }

  // const fetchUserInfo = async () => {
  //   const response = await fetch(`http://localhost:5000/auth/userinfo`,{
  //     method: "GET",
  //     headers: {
  //       token: localStorage.getItem('token')
  //     }
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   setUser(data);
  // }

  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     fetchUserInfo();
  //   }
  // }, [localStorage.getItem('token')]);

  const handleButtonClick = () => {
    buttonRef.current.click();
    console.log("modal open")
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Navbar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {localStorage.getItem('token') === null ? (
      <>
      <Link type="button" to='/login' className="btn btn-primary mr-sm-2">Login</Link>
      <Link type="button" to='/signup' className="btn btn-primary my-2 my-sm-0">Signup</Link>
      </>
      ) : (
      <><Link type="button" onClick={handleLogout} className="btn btn-primary mr-sm-2">Logout</Link>
        <div onClick={handleButtonClick}>
          <img
                    // src={user.imagePath} 
                    src={`http://localhost:5000/uploads/${user.imagePath}`}
                    alt="User Avatar"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }}
                  />
          </div>
      </>
      )
      }
    </form>
  </div>
</nav>

<button type="button" ref={buttonRef} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#navbarModal">
  Launch demo modal
</button>

<div class="modal fade" id="navbarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <div class="modal-body">
      <img
                  // src={user.imagePath} 
                  src={`http://localhost:5000/uploads/${user.imagePath}`}
                  alt="User Avatar"
                  className="rounded-circle mx-auto d-block"
                  style={{ width: '300px', height: '300px', marginRight: '10px' }}
                />
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Navbar
