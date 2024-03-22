import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(`http://localhost:5000/auth/login`,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    if(data.success === true){
    localStorage.setItem('token', data.authToken);
    localStorage.setItem('usertype', data.usertype);
    console.log(localStorage.getItem('token'));
    // showAlert("Login Successfully","success");
    navigate('/');
    } else {
      // showAlert("Invlid Crediantials","danger");
    }
  }

  return (
    <form className="container my-3" onSubmit={handleSubmit}>
      {/* <div class="form-group">
    <label for="exampleFormControlSelect1">User select</label>
    <select class="form-control" id="exampleFormControlSelect1" name="userType" value={formData.userType} onChange={handleChange}>
      <option>Admin User</option>
      <option>Agent User</option>
    </select>
      </div> */}

      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
