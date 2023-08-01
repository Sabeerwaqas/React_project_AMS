import React, { useState } from "react";
import "./student.css";
import { TextField } from "@mui/material";

const Student = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [number, setNumber] = useState("");
  const [classes, setClass] = useState("");

  const [inputData, setInputData] = useState([]);
  const [lastStudentNumber, setLastStudentNumber] = useState(0); 

  const handleNumber = (e) => {
    const number = e.target.value;
    setNumber(number);
  };

  const handleStudentName = (e) => {
    const studentName = e.target.value;
    setStudentName(studentName);
  };

  const handleFatherName = (e) => {
    const fatherName = e.target.value;
    setFatherName(fatherName);
  };

  const handleClass = (e) => {
    const classes = e.target.value;
    setClass(classes);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now(),
      number: number || lastStudentNumber + 1, 
      studentName: studentName,
      fatherName: fatherName,
      classes: classes,
    };

    setInputData([...inputData, newData]);
    setLastStudentNumber(newData.number); 

    setNumber("");
    setStudentName("");
    setFatherName("");
    setClass("");
  };

  const handleDelete = (id) => {
    const updatedData = inputData.filter((filteredData) => filteredData.id !== id);
    setInputData(updatedData);


    const updatedDataWithSerialNumbers = updatedData.map((data, index) => {
      return {
        ...data,
        number: index + 1,
      };
    });
    setInputData(updatedDataWithSerialNumbers);
    setLastStudentNumber(updatedDataWithSerialNumbers.length); 
  };

  return (
    <>
      <div className="flex-container">
        <div className="flex-child-one">
          <div>
            <h3 className="teachers-heading teacher">
              <b>Students</b>
            </h3>
            <table>
              <thead>
                <tr>
                  <td className="teacher-headings-data">Student's ID</td>
                  <td className="teacher-headings-data">Student's Name</td>
                  <td className="teacher-headings-data">Father's Name</td>
                  <td className="teacher-headings-data">Class</td>
                  <td className="teacher-headings-data">Action</td>
                </tr>
              </thead>
              <tbody>
                {inputData.map((newData, index) => (
                  <tr key={index}>
                    <td className="teacher-headings-data-table name-teacher">{newData.number}</td>
                    <td className="teacher-headings-data-table email-teacher">{newData.studentName}</td>
                    <td className="teacher-headings-data-table number-teacher">{newData.fatherName}</td>
                    <td className="teacher-headings-data-table action-teacher">{newData.classes}</td>
                    <td className="teacher-headings-data-table action-teacher">
                      <button className="delete-teacher" onClick={() => handleDelete(newData.id)}>Delete</button>
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
                    name="student_id"
                    value={number}
                    className="teacher-email-input"
                    size="small"
                    onChange={handleNumber}
                    type="text"
                    variant="standard"
                    label="Enter Student's Number"
                  />
                </div>
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
                    value={classes}
                    onChange={handleClass}
                    size="small"
                    type="text"
                    variant="standard"
                    label="Enter Class"
                  />
                </div>
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
