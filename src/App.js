import React, { useState, useEffect } from "react";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Main from "./Components/Main/Main";
import Sidebar from "./Components/Main/Sidebar/Sidebar";
import Classes from "./Components/Classes/Classes";
import Teacher from "./Components/Teachers/Teacher";
import Student from "./Components/Students/Student";
import { auth } from "./Firebase/firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [isSignupPage, setIsSignupPage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    setIsSignupPage(<Link to = "signup"/>);

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
              {/* <Route path="/main" element={<Main />} /> */}
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
          {user && <Route path="/main" element={<Navigate to="/main" />} />}
          {!user && isSignupPage && (
            <Route path="/signup" element={<Signup/>} />
          )}
        </Routes>
        {/* {!user && isSignupPage && (
          <Link to="/signup">
            Signup
          </Link>
        )} */}
      </BrowserRouter>
    </>
  );
};

export default App;
