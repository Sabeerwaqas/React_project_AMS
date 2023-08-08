import React, { useState } from "react";
import "./signup.css";
import { Box, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      toast.warning("Please type the same password.");
      return;
    }

    if (!email || !password) {
      toast.warning("Please fill all the forms.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // console.log("User signed up:", user);
        // Redirect to the login page after successful signup
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup error:", errorCode, errorMessage);
      });
    toast.success("SignUp Successfully");
    // navigate("/");

  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="ams">Attendance Management System</h2>

      <div className="signup-box">
        <h4 className="signup-heading">
          <Link to={"/"}>LogIn</Link>
        </h4>
        <h4 className="signup-heading">
          <Link to={"/signup"}>SignUp</Link>
        </h4>

        <Box
          sx={{
            marginLeft: "20%",
            marginTop: "10%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              label="Email"
              className=" signup-email-input"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                marginTop: "0%",
              }}
            />
            <TextField
              variant="standard"
              label="Password"
              className="signup-input special-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginTop: "4%",
              }}
            />
            <TextField
              variant="standard"
              label="Re-Type Password"
              className="signup-input special-input"
              type="password"
              onChange={(e) => setRetypePassword(e.target.value)}
              sx={{
                marginTop: "4%",
              }}
            />
            <button type="submit" className="signup-btn">
              SignUp
            </button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Signup;
