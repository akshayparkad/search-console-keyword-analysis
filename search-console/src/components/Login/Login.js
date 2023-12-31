import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service";

const Login = () => {
  var navigate = useNavigate();
  var [errorEmail, setEmail] = useState("");
  var [errorPassword, setPassword] = useState("");

  let [data, setData] = useState();

  var handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  var handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(data);

      if (response.data.status === 'ok') {  
        sessionStorage.removeItem('token'); //removing already existed token in case use relogin
        const name = {name: response.data.user.name}
        sessionStorage.setItem('jwt-token', response.data.user.token);

        setEmail("");
        setPassword("");
        //sessionStorage.setItem("jwtToken", "Bearer " + response.data.jwtToken);
          navigate(`/dashboard`,{ state: name});
       
      }else {
        setEmail("*invalid Email");
        setPassword("*invalid Password");
      }
  
  };

  return (
    <div className="main-container">
      <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
              Sign In
            </h1>
          <div className="container-signin">
            
            <form onSubmit={handleSubmit}>
             
              <div className="mt-3 d-flex flex-column justify-content-center">
                <label htmlFor="email">Email-Id</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email-Id"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">{errorEmail}</span>
              <div className="mt-3 d-flex flex-column justify-content-center">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">
                {errorPassword}
              </span>
              <p className="signup-link-signin">
              Don't have an account? <Link to='/register'> Sign Up </Link> 
              </p>

              <p className="signup-link-signin">
             <Link to='/forgot-password'> Forgot Password? </Link>  
              </p>

              <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                <button
                  type="submit"
                  style={{ backgroundColor: "green", color: "white" }}
                  id="signbtn"
                  className="btn w-50"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default Login;
