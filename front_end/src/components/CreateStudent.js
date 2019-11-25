import React, { useState } from "react";
import axios from "axios";

const CreateStudent = () => {
  const [state, setState] = useState({
    id: 0,
    name: "",
    schedule: "",
    preferences: "",
    address: ""
  });
  let addressID;
  const resetState = () => {
    setState({
      id: 0,
      name: "",
      schedule: "",
      preferences: "",
      address: ""
    });
  };
  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  const logInput = () => {
    console.log(`Form submitted:`);
    console.log(`Student ID: ${state.id}`);
    console.log(`Name: ${state.name}`);
    console.log(`Schedule Key:${state.schedule}`);
    console.log(`Preferences Key: ${state.preferences}`);
    console.log(`Address Key: ${state.address}`);
  };
  const callDbApi = () => {
    axios
      .post("http://localhost:4000/students/add", makePostInstance())
      .then(res => console.log(res.data));
  };

  const makePostInstance = () => {
    console.log(addressID);
    console.log(state.schedule.split(","));
    return {
      _id: state.id,
      student_name: state.name,
      _student_address: state.address,
      _student_schedule: state.schedule.split(","),
      _student_preferences: state.preferences
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
      <h3>Create Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID: </label>
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
            name="name"
            value={state.name}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>
            Schedule Key: schedule entry keys as comma separated values{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="schedule"
            value={state.schedule}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Adress Key: </label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={state.address}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Preferences Key: </label>
          <input
            type="text"
            className="form-control"
            name="preferences"
            value={state.preferences}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Student"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
