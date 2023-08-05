import React, { useState, useEffect } from "react";
import "./teachers.css";
import { TextField } from "@mui/material";
import { db } from "../../Firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [teachers, setTeachers] = useState([]);
  const teachersCollectionRef = collection(db, "teachersData");
  const [error, setError] = useState("");


  const createTeachers = async () => {
    try {
      await addDoc(teachersCollectionRef, {
        email: email,
        name: name,
        number: number,
      });
      console.log("Teacher added successfully!");

      const newData = {
        email: email,
        name: name,
        number: number,
      };

      setTeachers((prevTeachers) => [...prevTeachers, newData]);

      setEmail("");
      setNumber("");
      setName("");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      const teacherDoc = doc(db, "teachersData", id);
      await deleteDoc(teacherDoc);

      setTeachers((prevTeacher) =>
        prevTeacher.filter((teacherData) => teacherData.id !== id)
      );

      console.log("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const getTeacher = async () => {
    try {
      const querySnapshot = await getDocs(teachersCollectionRef);
      const teachers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTeachers(teachers);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    getTeacher();
  }, [teachers]);

  // const [inputData, setInputData] = useState([]);

  // Handle values

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    setError("");
    console.log(name);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setError("");
    console.log(email);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNumber(number);
    setError("");
    console.log(number);
  };

  // Read data

  const handleClick = (e) => {
    e.preventDefault();
    if (!name || !email || !number) {
      setError(toast.warning("Please fill all the requirements"));
      return;
    } else {
      toast.success("Teacher Added Successfully.");
    }

    createTeachers();
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex-container">
        <div className="flex-child-one">
          <div>
            <h3 className="teachers-heading teacher">
              <b>Teachers</b>
            </h3>
            <table>
              <thead>
                <tr>
                  <td className="teacher-headings-data">Teacher's Name</td>
                  <td className="teacher-headings-data">Teacher's Email</td>
                  <td className="teacher-headings-data">Teacher's Phone #</td>
                  <td className="teacher-headings-data">Action</td>
                </tr>
              </thead>
            </table>

            {teachers.map((newData, index) => {
              return (
                <div>
                  <table>
                    <tbody className="table-data-body">
                      <tr>
                        <td className="teacher-headings-data-table name-teacher">
                          {newData.name}
                        </td>
                        <td className="teacher-headings-data-table email-teacher">
                          {newData.email}
                        </td>
                        <td className="teacher-headings-data-table number-teacher">
                          {newData.number}
                        </td>
                        <td className="teacher-headings-data-table action-teacher">
                          <button
                            className="delete-teacher"
                            onClick={() => deleteTeacher(newData.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-child-two">
          <div>
            <h3 className="teachers-heading heading-one">
              <b>Add Teachers</b>
            </h3>
            <div className="form-div">
              <form>
                <div>
                  <TextField
                    name="teaher_name"
                    value={name}
                    className="teacher-email-input"
                    size="small"
                    onChange={(e) => handleNameChange(e)}
                    type="text"
                    variant="standard"
                    label="Enter Teacher's Name"
                  />
                </div>
                <div>
                  <TextField
                    name="teaher_email"
                    className="teacher-email-input"
                    value={email}
                    size="small"
                    onChange={(e) => handleEmailChange(e)}
                    type="email"
                    variant="standard"
                    label="Enter Teacher's Email"
                  />
                </div>
                <div>
                  <TextField
                    name="teaher_email"
                    className="teacher-email-input"
                    value={number}
                    onChange={(e) => handleNumberChange(e)}
                    size="small"
                    type="number"
                    variant="standard"
                    label="Enter Teacher's Phone #"
                  />
                </div>

                <button onClick={handleClick} className="add-teacher">
                  Add Teacher
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
