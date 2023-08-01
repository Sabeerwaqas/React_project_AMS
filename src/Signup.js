import React, { useState } from "react";
import "./login-signup.css";
import {auth, createUserWithEmailAndPasword} from "./Firebase/firebase"
import { TextField, Button, Box } from "@mui/material";

const Signup = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = () => {
        
    }


  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F2F3F9",
          width: "20vw",
          height: "25vh",
          margin: "0 auto",
          marginTop: "10%",
          padding: "5%",
        }}
      >
        <TextField
          placeholder="Enter Email Here"
          sx={{
            marginLeft: "10%"
           
          }}
          size="small"
          label="Email"

        />
        <TextField
          placeholder="Enter Password Here"
          sx={{
            marginLeft: "10%",
            marginTop: "5%"
            
          }}
          size="small"
          label="Password"
        />

        <Button variant="contained"
        color="success"
        size="small"
        sx = {{
            width: "84%",
            marginLeft: "10%",
            marginTop: "5%",
            fontWeight: "bold"
        }}

        onSubmit={handleSubmit}


        >SignUp</Button>
      </Box>
    </>
  );
};

export default Signup;
