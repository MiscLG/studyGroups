import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EditStudyLocation = props => {
  const [state, setState] = useState({
    studyLocation_name: "",
    studyLocation_noise_level: 0,
    studyLocation_availability: 0,
    _studyLocation_address: "",
    _studyLocation_schedule: ""
  });

  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const studyLocation = {
      studyLocation_name: state.studyLocation_name,
      studyLocation_noiselevel: state.studyLocation_noise_level,
      studyLocation_availability: state.studyLocation_availability,
      _studyLocation_address: state._studyLocation_address,
      _studyLocation_schedule: state._studyLocation_schedule.split(",")
    };
    console.log(studyLocation);
    await axios
      .post(
        "http://localhost:4000/studyLocations/update/" + props.match.params.id,
        studyLocation
      )
      .then(res => console.log(res.data));

    props.history.push("/");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/studyLocations/" + props.match.params.id)
      .then(response => {
        setState({
          studyLocation_name: response.data.studyLocation_name,
          studyLocation_noise_level: response.data.studyLocation_noise_level,
          studyLocation_availability: response.data.studyLocation_availability,
          _studyLocation_address: response.data._studyLocation_address,
          _studyLocation_schedule: response.data._studyLocation_schedule.join(
            ","
          )
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Edit Study Location</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control"
            name="studyLocation_name"
            value={state.studyLocation_name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Noise Level: </label>
          <input
            type="number"
            className="form-control"
            name="studyLocation_noise_level"
            value={state.studyLocation_noise_level}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Availability: </label>
          <input
            type="number"
            className="form-control"
            name="studyLocation_availability"
            value={state.studyLocation_availability}
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
            name="studyLocation_schedule"
            value={state._studyLocation_schedule}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Adress Key: </label>
          <input
            type="text"
            className="form-control"
            name="studyLocation_address"
            value={state._studyLocation_address}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Study Location"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditStudyLocation;
