import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  <tr>
    <td>{props.course._id}</td>
    <td>{props.course.course_name}</td>
    <td>{props.course.course_instructor_name}</td>
    <td>{props.course._course_roster.join(",")}</td>
    <td>{props.course._course_schedule.join(",")}</td>
    <td>
      <Link to={"/course/edit/" + props.course._id}>Edit</Link>
    </td>
  </tr>
);

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);

  const list = () => {
    return courseList.map((currentCourse, i) => (
      <Course course={currentCourse} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/courses")
      .then(response => {
        setCourseList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>Course List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>CRN</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Roster</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default CourseList;
