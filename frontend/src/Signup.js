import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
    imagePath: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "imagePath" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append("userType", formData.userType);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("cPassword", formData.cPassword);
    formDataToSend.append("imagePath", formData.imagePath);

    const response = await fetch(`http://localhost:5000/auth/signup`,{
        method: "POST",
        // headers: {
        //   Content-Type: 'multipart/form-data'
        // },
        body: formDataToSend
    })
    const data = await response.json();
    console.log(response);
    console.log(data);

    // if(response.status===470){
    //   return showAlert("Password and confirm password do not match","danger");
    // }

    // if(response.status===404){
    //   return showAlert("User already exits with this email","danger");
    // }

    localStorage.setItem('token', data.authToken);
    localStorage.setItem('usertype', data.usertype);
    // showAlert("SignUp Successfully","success");
    navigate('/');
  }

  return (
    <form className="container my-3" onSubmit={(event)=>handleSubmit(event)}>
      <div class="form-group">
    <label for="exampleFormControlSelect1">User select</label>
    <select class="form-control" id="exampleFormControlSelect1" name="userType" value={formData.userType} onChange={handleChange}>
      <option>Admin User</option>
      <option>Agent User</option>
    </select>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="enter username"
          name="username"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          value={formData.email}
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
      <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="confirm"
          name="cPassword"
          value={formData.cPassword}
          onChange={handleChange}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlFile1">Upload Image</label>
        <input
          type="file"
          class="form-control-file"
          id="exampleFormControlFile1"
          name="imagePath"
          onChange={handleChange}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Signup;
