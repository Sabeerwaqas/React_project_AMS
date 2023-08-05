import React, { useState } from "react";
import "./signup.css";
import { Box, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User signed up:", user);
        // You can display a success message or redirect to the login page here
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup error:", errorCode, errorMessage);
        // You can display an error message here if needed
      });
  };

  return (
    <>
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
              className="signup-input email-input"
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
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginTop: "4%",
              }}
            />
            <button type="submit" className="signup-btn special-btn">
              SignUp
            </button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Signup;
