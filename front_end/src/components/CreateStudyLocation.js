import React, { useState } from "react";
import axios from "axios";

const CreateStudyLocation = () => {
  const [state, setState] = useState({
    name: "",
    noise_level: 0,
    availability: 0,
    schedule: "",
    address: ""
  });
  let addressID;
  const resetState = () => {
    setState({
      name: "",
      noise_level: 0,
      availability: 0,
      schedule: "",
      address: ""
    });
  };
  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  const logInput = () => {
    console.log(`Form submitted:`);
    console.log(`Name: ${state.name}`);
    console.log(`Noise Level: ${state.noise_level}`);
    console.log(`Availability: ${state.availability}`);
    console.log(`Schedule Key:${state.schedule}`);
    console.log(`Address Key: ${state.address}`);
  };
  const callDbApi = () => {
    axios
      .post("http://localhost:4000/studyLocations/add", makePostInstance())
      .then(res => console.log(res.data));
  };

  const makePostInstance = () => {
    console.log(addressID);
    console.log(state.schedule.split(","));
    return {
      studyLocation_name: state.name,
      studyLocation_noise_level: state.noise_level,
      studyLocation_availability: state.availability,
      _studyLocation_address: state.address,
      _studyLocation_schedule: state.schedule.split(",")
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
      <h3>Create Study Location</h3>
      <form onSubmit={handleSubmit}>
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
          <label>Noise Level: </label>
          <input
            type="number"
            className="form-control"
            name="noise_level"
            value={state.noise_level}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Availability: </label>
          <input
            type="number"
            className="form-control"
            name="availability"
            value={state.availability}
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
          <input
            type="submit"
            value="Create Study Location"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateStudyLocation;
