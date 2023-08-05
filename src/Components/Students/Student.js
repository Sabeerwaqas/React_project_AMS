import React, { useEffect, useState } from "react";
import "./student.css";
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

const Student = () => {
  const [className, setClassName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const studentsCollectionRef = collection(db, "students");

  const createStudent = async () => {
    try {
      await addDoc(studentsCollectionRef, {
        class: className,
        father_name: fatherName,
        student_name: studentName,
      });
      console.log("Student added successfully!");

      const newData = {
        class: className,
        father_name: fatherName,
        student_name: studentName,
      };

      setStudents((prevStudents) => [...prevStudents, newData]);

      setStudentName("");
      setFatherName("");
      setClassName("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);

      setStudents((prevStudents) =>
        prevStudents.filter((studentData) => studentData.id !== id)
      );

      console.log("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const getStudents = async () => {
    try {
      const querySnapshot = await getDocs(studentsCollectionRef);
      const studentsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, [students]);

  const handleStudentName = (e) => {
    const studentName = e.target.value;
    setStudentName(studentName);
    setError("");
  };

  const handleFatherName = (e) => {
    const fatherName = e.target.value;
    setFatherName(fatherName);
    setError("");
  };

  const handleClass = (e) => {
    const className = e.target.value;
    setClassName(className);
    setError("");
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!studentName || !fatherName || !className) {
      setError(toast.warning("Please fill all the requirements"));
      

      return;
    }
    else{
      toast.success("Student Added Successfully.")
    }

    createStudent();
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
              <b>Students</b>
            </h3>
            <table>
              <thead>
                <tr>
                  <td className="teacher-headings-data">Student's Name</td>
                  <td className="teacher-headings-data">Father's Name</td>
                  <td className="teacher-headings-data">Class</td>
                  <td className="teacher-headings-data">Action</td>
                </tr>
              </thead>
              <tbody>
                {students.map((newData) => (
                  <tr key={newData.id}>
                    <td className="teacher-headings-data-table email-teacher">
                      {newData.student_name}
                    </td>
                    <td className="teacher-headings-data-table number-teacher">
                      {newData.father_name}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      {newData.class}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      <button
                        className="delete-teacher"
                        onClick={() => deleteStudent(newData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-child-two">
          <div>
            <h3 className="teachers-heading heading-one">
              <b>Add Students</b>
            </h3>
            <div className="form-div">
              <form>
                <div>
                  <TextField
                    name="student_name"
                    className="teacher-email-input"
                    value={studentName}
                    size="small"
                    onChange={handleStudentName}
                    type="text"
                    variant="standard"
                    label="Enter Student's Name"
                  />
                </div>
                <div>
                  <TextField
                    name="father_name"
                    className="teacher-email-input"
                    value={fatherName}
                    onChange={handleFatherName}
                    size="small"
                    type="text"
                    variant="standard"
                    label="Enter Father's Name"
                  />
                </div>
                <div>
                  <TextField
                    name="class"
                    className="teacher-email-input"
                    value={className}
                    onChange={handleClass}
                    size="small"
                    type="text"
                    variant="standard"
                    label="Enter Class"
                  />
                </div>
                {/* {error && <p className="error-message">{error}</p>} */}
                <button onClick={handleClick} className="add-teacher">
                  Add Student
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
