import React, { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [state, setState] = useState({
    id: 0,
    course_name: "",
    course_instructor_name: "",
    course_roster: "",
    course_schedule: ""
  });
  let addressID;
  const resetState = () => {
    setState({
      id: 0,
      course_name: "",
      course_instructor_name: "",
      course_roster: "",
      course_schedule: ""
    });
  };
  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  // const handleAddressInput = event => {
  //   let field = event.target;
  //   setState({
  //     ...state,
  //     address: {
  //       ...state.address,
  //       [field.name]: field.value
  //     }
  //   });
  // };

  // const getAddress = childState => {
  //   console.log({ ...childState });
  //   setState({
  //     ...state,
  //     address: childState
  //   });
  //   console.log(state.address);
  // };

  const logInput = () => {
    const address = state.address;
    console.log(`Form submitted:`);
    console.log(`Course CRN: ${state.id}`);
    console.log(`Name: ${state.course_name}`);
    console.log(`Instructor: ${state.course_instructor_name}`);
    console.log(`Schedule Key:${state.course_schedule}`);
    console.log(`Preferences Key: ${state.course_roster}`);
  };
  const callDbApi = () => {
    axios
      .post("http://localhost:4000/courses/add", makePostInstance())
      .then(res => console.log(res.data));
  };

  // const makeAddressPostInstance = () => {
  //   return {
  //     address_name: state.address.name,
  //     address_street: state.address.street,
  //     address_city: state.address.city,
  //     address_zip: state.address.zip
  //   };
  // };

  const makePostInstance = () => {
    return {
      _id: state.id,
      course_name: state.course_name,
      course_instructor_name: state.course_instructor_name,
      _course_schedule: state.course_schedule.split(","),
      _course_roster: state.course_roster.split(",")
    };
  };

  const handleSubmit = event => {
    event.preventDefault();
    logInput();
    callDbApi();
    resetState();
  };
  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course ID: </label>
          <input
            type="number"
            className="form-control"
            name="id"
            value={state.id}
            onChange={handleInput}
          />
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
            value={state.course_schedule}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Student IDs: </label>
          <input
            type="text"
            className="form-control"
            name="course_roster"
            value={state.course_roster}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Course"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
