import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EditCourse = props => {
  const [state, setState] = useState({
    _id: 0,
    course_name: "",
    course_instructor_name: "",
    _course_schedule: "",
    _course_roster: ""
  });

  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const course = {
      _id: state._id,
      course_name: state.course_name,
      course_instructor_name: state.course_instructor_name,
      _course_schedule: state._course_schedule.split(","),
      _course_roster: state._course_roster.split(",")
    };
    console.log(course);
    await axios
      .post(
        "http://localhost:4000/courses/update/" + props.match.params.id,
        course
      )
      .then(res => console.log(res.data));

    props.history.push("/");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/" + props.match.params.id)
      .then(response => {
        setState({
          _id: response.data._id,
          course_name: response.data.course_name,
          course_instructor_name: response.data.course_instructor_name,
          _course_schedule: response.data._course_schedule,
          _course_roster: response.data._course_roster.join(",")
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Edit Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course ID: {state._id}</label>
          {/* <input
            type="number"
            className="form-control"
            name="_id"
            value={state._id}
            onChange={handleInput}
          /> */}
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control"
            name="course_name"
            value={state.course_name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Instructor Name: </label>
          <input
            type="text"
            className="form-control"
            name="course_instructor_name"
            value={state.course_instructor_name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>
            Schedule Keys: schedule entry keys as comma separated values{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="course_schedule"
            value={state._course_schedule}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Course IDs: </label>
          <input
            type="text"
            className="form-control"
            name="course_roster"
            value={state._course_roster}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
