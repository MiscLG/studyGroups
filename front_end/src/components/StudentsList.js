import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Student = props => (
  <tr>
    <td>{props.student._id}</td>
    <td>{props.student.student_name}</td>
    <td>{props.student._student_address}</td>
    <td>{props.student._student_schedule.join(",")}</td>
    <td>{props.student._student_preferences}</td>
    <td>
      <Link to={"/edit/" + props.student._id}>Edit</Link>
    </td>
  </tr>
);

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);

  const list = () => {
    return studentList.map((currentStudent, i) => (
      <Student student={currentStudent} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/students")
      .then(response => {
        setStudentList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>Student List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Schedule</th>
            <th>Preferences</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default StudentList;
