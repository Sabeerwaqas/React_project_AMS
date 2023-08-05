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

const Classes = () => {
  const [className, setClassName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classLimit, setClassLimit] = useState("");
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  const classesCollectionRef = collection(db, "classes");

  const createClass = async () => {
    try {
      await addDoc(classesCollectionRef, {
        className: className,
        classTeacher: classTeacher,
        classLimit: classLimit,
      });
      console.log("Class added successfully!");

      const newData = {
        className: className,
        classTeacher: classTeacher,
        classLimit: classLimit,
      };

      setClasses((prevClasses) => [...prevClasses, newData]);

      setClassName("");
      setClassTeacher("");
      setClassLimit("");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const deleteClass = async (id) => {
    try {
      const classDoc = doc(db, "classes", id);
      await deleteDoc(classDoc);

      setClasses((prevClasses) =>
        prevClasses.filter((classData) => classData.id !== id)
      );

      console.log("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const getClasses = async () => {
    try {
      const querySnapshot = await getDocs(classesCollectionRef);
      const classesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClasses(classesData);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  useEffect(() => {
    getClasses();
  }, [classes]);

  const handleClassName = (e) => {
    const className = e.target.value;
    setClassName(className);
    setError("");
  };
  const handleClassTeacher = (e) => {
    const classTeacher = e.target.value;
    setClassTeacher(classTeacher);
    setError("");
  };
  const handleClassLimit = (e) => {
    const classLimit = e.target.value;
    setClassLimit(classLimit);
    setError("");
  };
  const handleClick = (e) => {
    e.preventDefault();

    if (!className || !classTeacher || !classLimit) {
      setError(toast.warning("Please fill all the requirements"));
      return;
    } else {
      toast.success("Class Added Successfully.");
    }
    createClass();
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
                {classes.map((classData) => (
                  <tr key={classData.id}>
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
                        onClick={() => deleteClass(classData.id)}
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
                    name="class_teacher"
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
                    name="class_limit"
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
