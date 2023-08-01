import React, { useEffect, useState } from "react";
import "../Students/student.css";
import { TextField } from "@mui/material";
import { db, auth } from "../../Firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// import { deleteUser } from "firebase/firestore";

const Classes = () => {
  const [className, setClassName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classLimit, setClassLimit] = useState();

  const [inputData, setInputData] = useState([]);

  const [classes, setClasses] = useState([]);
  const usersCollectionRef = collection(db, "classes");

  const createClass = async () => {
    try {
      await addDoc(usersCollectionRef, {
        class: className,
        teacher: classTeacher,
        limit: classLimit,
      });
      console.log("Class added successfully!");
  
      const newData = {
        id: Date.now(),
        className: className,
        classTeacher: classTeacher,
        classLimit: classLimit,
      };
  
      setClasses((prevClasses) => [...prevClasses, newData]);
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(usersCollectionRef);
      const classesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClasses(classesData);
    };  
  
    getUsers();
  }, []);
  
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
      classLimit: classLimit,
    };

    setInputData([...inputData, newData]);

    createClass();

    setClassName("");
    setClassTeacher("");
    setClassLimit("");
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "classes", id);
    await deleteDoc(userDoc);
    setClasses((prevClasses) =>
      prevClasses.filter((classData) => classData.id !== id)
    );
  };

  return (
    <>
      <div className="flex-container">
        <div className="flex-child-one">
          <div>
            <h3 className="teachers-heading teacher">
              <b>Classes</b>
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
                {classes.map((classData, index) => (
                  <tr key={index}>
                    <td className="teacher-headings-data-table email-teacher">
                      {classData.className}
                    </td>
                    <td className="teacher-headings-data-table number-teacher">
                      {classData.classTeacher}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      {classData.classLimit}
                    </td>
                    <td className="teacher-headings-data-table action-teacher">
                      <button
                        className="delete-teacher"
                        onClick={() => deleteUser(classData.id)}
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
