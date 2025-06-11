import React, { useState } from "react";
import "./Login.css";
import axios from "axios"
import { backendUrl } from "../../App";
import { toast} from 'react-toastify'

const Login = ({setToken}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler  =  async (e) =>{
    try {
      e.preventDefault()
      // console.log(email,password);
      const response = await axios.post(backendUrl + '/api/users/admin', {email,password})
      console.log(response);

      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="admin-panel-container">
        <div className="admin-panel-box">
          <h1 className="login-title">Admin Panel</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <p className="form-label">Email Address</p>
              <input
                type="email"
                className="form-input"
                placeholder="Enter Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <p className="form-label">Password</p>
              <input
                type="password"
                className="form-input"
                placeholder="Enter Password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button className="form-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
