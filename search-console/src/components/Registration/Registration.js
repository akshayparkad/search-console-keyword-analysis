import "./Registration.css";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../Service";

const Registration = () => {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  let [error, setError] = useState({
    errorName: "",
    errorEmail: "",
    errorcity: "",
    errorPassword: "",
    errorRePassword: "",
    errorType: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("in");
      const res = await registerUser(data);

      console.log(res.data.status);
      if (res.data.status == "ok") {

        navigate("/login");

      } else if (res.data.status == "error") {

        document.getElementById("fail-box-1").innerHTML =
          "User with given email is already exist";

        setTimeout(() => {
          document.getElementById("fail-box-1").innerHTML = " ";
        }, 4000);
      }
    }
  };

  var validate = () => {
    error = {};
    const nameregx = /^([a-z]+(-| )?)+$/i;
    const emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const Passwordregx =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // validation

    if (!data.name) {
      setError({ errorName: "*Name is required" });
      return false;
    } else if (!data.name.match(nameregx)) {
      setError({ errorName: "*Invalid name" });
      return false;
    } else {
      setError({ errorName: "" });
    }

    if (!data.email) {
      setError({ errorEmail: "*Email is required" });
      return false;
    } else if (!data.email.match(emailregx)) {
      setError({ errorEmail: "*Invalid email" });
      return false;
    } else {
      setError({ errorEmail: "" });
    }

    if (!data.password) {
      setError({ errorPassword: "*Password is required" });
      return false;
    } else if (!data.password.match(Passwordregx)) {
      setError({
        errorPassword: "*Password must be like Abcde@123",
      });
      return false;
    } else {
      setError({ errorPassword: "" });
    }

    if (!data.confirmPassword) {
      setError({ errorRePassword: "*Confirm password is required" });
      return false;
    } else if (data.password !== data.confirmPassword) {
      setError({
        errorRePassword: "*Password does not match",
      });
      return false;
    } else {
      setError({ errorRePassword: "" });
      return true;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "700px",
        height: "auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "6fr 6fr",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="RegistrationImage">
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <h1 style={{ textShadow: "1px 1px #2c3e50" }}>
              E-Vehicle Charging
            </h1>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Join now and track e-vehicle charging station and book your slot
              in advance!
            </p>
          </div>
        </div>
        <div>
          <div className="container-signup">
            <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
              Create Account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-1 d-flex flex-column justify-content-center">
                <label htmlFor="username ">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">{error.errorName}</span>
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
              <span className="text-danger">{error.errorEmail}</span>

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
              <span className="text-danger">{error.errorPassword}</span>
              <div className="mt-3 d-flex flex-column justify-content-center">
                <label htmlFor="repass">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                  className="form-control shadow-none"
                />
              </div>
              <span className="text-danger">{error.errorRePassword}</span>
              <p className="login-link-signup">
                Already have an account? <Link to="/login"> Sign In </Link>
              </p>
              <div id="fail-box-1"></div>
              <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                <button
                  type="submit"
                  style={{ backgroundColor: "green", color: "white" }}
                  id="signbtn"
                  className="btn w-50"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
