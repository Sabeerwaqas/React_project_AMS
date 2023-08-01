import React, { useState } from "react";
import "./teachers.css";
import { TextField } from "@mui/material";

const Teacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [photo, setPhoto] = useState("");

  const [inputData, setInputData] = useState([]);

  // Handle values

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);

    console.log(name);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    console.log(email);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNumber(number);
    console.log(number);
  };


  const handlePhoto = (e) => {
    const teacherPhoto = e.target.value;
    setPhoto(teacherPhoto)
  }

  // Read data

  const handleClick = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now(),
      name: name,
      email: email,
      number: number,


    };

    setInputData([...inputData, newData]);

    setName("");
    setEmail("");
    setNumber("");
    setPhoto("");

    // console.log(inputData);
  };

  // Delete data

  const handleDelete = (id) => {

    const updatedData = inputData.filter((filteredData) => filteredData.id !== id);
    setInputData(updatedData);

  }

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
                  <td className="teacher-headings-data">Teacher's Name</td>
                  <td className="teacher-headings-data">Teacher's Email</td>
                  <td className="teacher-headings-data">Teacher's Phone #</td>
                  <td className="teacher-headings-data">Action</td>
                </tr>
              </thead>
            </table>

            {inputData.map((newData, index) => {
              return (

                <div>
                  <table>
                    <tbody className="table-data-body">
                      <tr>
                        <td className="teacher-headings-data-table name-teacher">{newData.name}</td>
                        <td className="teacher-headings-data-table email-teacher">{newData.email}</td>
                        <td className="teacher-headings-data-table number-teacher">{newData.number}</td>
                        <td className="teacher-headings-data-table action-teacher"><button className="delete-teacher" onClick={() => handleDelete(newData.id)}>Delete</button></td>
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
                <div>
                  <TextField
                    name="teaher_photo"
                    className="teacher-email-input"
                    value={photo}
                    onChange={(e) => handleNumberChange(e)}
                    size="small"
                    type="file"
                    variant="standard"
                    label="Upload Teacher's Photo"
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
