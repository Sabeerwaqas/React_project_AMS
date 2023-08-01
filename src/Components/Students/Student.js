import React, { useState } from "react";
import "./student.css";
import { TextField } from "@mui/material";

const Student = () => {
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [id, setID] = useState("");
  const [classes, setClass] = useState("");
  const [photo, setPhoto] = useState("");

  const [inputData, setInputData] = useState([]);

  const handleStudentID = (e) => {
    const id = e.target.value;
    setID(id);
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

  const handlePhoto = (e) => {
    const photo = e.target.value;
    setPhoto(photo);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const newData = {
      id: id,
      studentName: studentName,
      fatherName: fatherName,
      classes: classes,
    };

    setInputData([...inputData, newData]);

    setID("");
    setStudentName("");
    setFatherName("");
    setClass("");
    setPhoto("");
  };

  const handleDelete = (id) => {
    const updatedData = inputData.filter((filteredData) => filteredData.id !== id);
    setInputData(updatedData);
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
                    <td className="teacher-headings-data-table name-teacher">{newData.id}</td>
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
                    value={id}
                    className="teacher-email-input"
                    size="small"
                    onChange={handleStudentID}
                    type="text"
                    variant="standard"
                    label="Enter Student's ID"
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
                <div>
                  <TextField
                    name="student_photo"
                    className="teacher-email-input"
                    value={photo}
                    onChange={handlePhoto}
                    size="small"
                    type="file"
                    variant="standard"
                    label="Upload Student's Photo"
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
