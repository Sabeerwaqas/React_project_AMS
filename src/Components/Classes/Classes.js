import React, { useState } from "react";
import "../Students/student.css";
import { TextField } from "@mui/material";

const Classes = () => {
  const [className, setClassName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classLimit, setClassLimit] = useState();

  const [inputData, setInputData] = useState([]);

  const handleClassName = (e) => {
    const className = e.target.value;
    setClassName(className);
  };

  const handleClassTeacher = (e) => {
    const classTeacher = e.target.value;
    setClassTeacher(classTeacher);
  };

  const handleClassLimit = (e) => {
    const classLimit = e.target.value;
    setClassLimit(classLimit);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now(),
      className: className,
      classTeacher: classTeacher,
      classLimit: classLimit
    };

    setInputData([...inputData, newData]);


    setClassName("");
    setClassTeacher("");
    setClassLimit("");
  };

  const handleDelete = (id) => {
    const updatedData = inputData.filter(
      (filteredData) => filteredData.id !== id
    );
    setInputData(updatedData);
  };

  return (
    <>
      <div className="flex-container">
        <div className="flex-child-one">
          <div>
            <h3 className="teachers-heading teacher">
              <b>Teachers</b>
            </h3>
            <table>
              <thead>
                <tr>
                  <td className="teacher-headings-data">Class Name</td>
                  <td className="teacher-headings-data">Class Teacher</td>
                  <td className="teacher-headings-data">Class Limit</td>
                  <td className="teacher-headings-data">Action</td>
                </tr>
              </thead>
              <tbody>
                {inputData.map((newData, index) => (
                  <tr key={index}>
                    <td className="teacher-headings-data-table email-teacher">
                      {newData.className}
                    </td>
                    <td className="teacher-headings-data-table number-teacher">
                      {newData.classTeacher}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      {newData.classLimit}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      <button
                        className="delete-teacher"
                        onClick={() => handleDelete(newData.id)}
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
              <b>Add Class</b>
            </h3>
            <div className="form-div">
              <form>
                <div>
                  <TextField
                    name="class_name"
                    className="teacher-email-input"
                    value={className}
                    size="small"
                    onChange={handleClassName}
                    type="text"
                    variant="standard"
                    label="Enter Class Name"
                  />
                </div>
                <div>
                  <TextField
                    name="father_name"
                    className="teacher-email-input"
                    value={classTeacher}
                    onChange={handleClassTeacher}
                    size="small"
                    type="text"
                    variant="standard"
                    label="Enter Class Teacher"
                  />
                </div>
                <div>
                  <TextField
                    name="class"
                    className="teacher-email-input"
                    value={classLimit}
                    onChange={handleClassLimit}
                    size="small"
                    type="number"
                    variant="standard"
                    label="Enter Class Limit"
                  />
                </div>
                <button onClick={handleClick} className="add-teacher">
                  Add Class
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classes;
