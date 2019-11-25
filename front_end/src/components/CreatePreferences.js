import React, { useState } from "react";
import axios from "axios";

const CreatePreferences = () => {
  const [state, setState] = useState({
    preference_noise_level: 0,
    preference_distance: 0,
    preference_study_duration: 0
  });

  const resetState = () => {
    setState({
      preference_noise_level: 0,
      preference_distance: 0,
      preference_study_duration: 0
    });
  };

  const logInput = () => {
    console.log(state);
    console.log(`Form submitted:`);
    console.log(`Noise Level: ${state.preference_noise_level}`);
    console.log(`Distance: ${state.preference_distance}`);
    console.log(`Study Duration: ${state.preference_study_duration}`);
  };

  const makePostInstance = () => {
    return {
      preference_noise_level: state.preference_noise_level,
      preference_distance: state.preference_distance,
      preference_study_duration: state.preference_study_duration
    };
  };

  const callDbApi = () => {
    axios
      .post("http://localhost:4000/preferences/add", makePostInstance())
      .then(res => console.log(res.data));
  };
  const handleSubmit = event => {
    event.preventDefault();
    logInput();
    callDbApi();
    resetState();
  };

  const handleInput = event => {
    const field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Preferences</h3>
      <form onSubmit={handleSubmit}>
        <CreatePreferencesNested {...state} handleInput={handleInput} />
        <div className="form-group">
          <input
            type="submit"
            value="Create Preferences"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

const CreatePreferencesNested = props => {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="form-group">
        <label>Noise Level: </label>
        <input
          type="number"
          className="form-control"
          name="preference_noise_level"
          value={props.preference_noise_level}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>Distance: </label>
        <input
          type="number"
          className="form-control"
          name="preference_distance"
          value={props.preference_distance}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>Study Duration: </label>
        <input
          type="number"
          className="form-control"
          name="preference_study_duration"
          value={props.preference_study_duration}
          onChange={props.handleInput}
        />
      </div>
    </div>
  );
};
export { CreatePreferences, CreatePreferencesNested };
