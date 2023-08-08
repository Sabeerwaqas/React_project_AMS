import React, { useState, useEffect } from "react";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Components/Main/Main";
import Sidebar from "./Components/Main/Sidebar/Sidebar";
import Classes from "./Components/Classes/Classes";
import Teacher from "./Components/Teachers/Teacher";
import Student from "./Components/Students/Student";
import { auth } from "./Firebase/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        {user && <Sidebar />}
        <Routes>
          {user ? (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="/students" element={<Student />} />
              <Route path="/teachers" element={<Teacher />} />
              <Route path="/classes" element={<Classes />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/" element={<Login />} /> */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
