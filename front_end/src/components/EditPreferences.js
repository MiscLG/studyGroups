import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPreferences = props => {
  const [state, setState] = useState({
    preference_noise_level: 0,
    preference_distance: 0,
    preference_study_duration: 0
  });

  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const preferences = {
      preference_noise_level: state.preference_noise_level,
      preference_distance: state.preference_distance,
      preference_study_duration: state.preference_study_duration
    };
    console.log(preferences);
    await axios
      .post(
        "http://localhost:4000/preferences/update/" + props.match.params.id,
        preferences
      )
      .then(res => console.log(res.data));

    props.history.push("/preferences");
  };

  useEffect(() => {
    console.log(props);
    axios
      .get("http://localhost:4000/preferences/" + props.match.params.id)
      .then(response => {
        console.log(response);
        setState({
          preference_noise_level: response.data.preference_noise_level,
          preference_distance: response.data.preference_distance,
          preference_study_duration: response.data.preference_study_duration
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Preferences</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10 }}>
          <div className="form-group">
            <label>Noise Level: </label>
            <input
              type="number"
              className="form-control"
              name="preference_noise_level"
              value={state.preference_noise_level}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>Distance: </label>
            <input
              type="number"
              className="form-control"
              name="preference_distance"
              value={state.preference_distance}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>Study Duration: </label>
            <input
              type="number"
              className="form-control"
              name="preference_study_duration"
              value={state.preference_study_duration}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Preferences"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPreferences;
