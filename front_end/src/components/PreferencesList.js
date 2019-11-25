import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Preferences = props => (
  <tr>
    <td>{props.preferences._id}</td>
    <td>{props.preferences.preference_noise_level}</td>
    <td>{props.preferences.preference_distance}</td>
    <td>{props.preferences.preference_study_duration}</td>
    <td>
      <Link to={"/preferences/edit/" + props.preferences._id}>Edit</Link>
    </td>
  </tr>
);

const PreferencesList = () => {
  const [preferencesList, setPreferencesList] = useState([]);

  const list = () => {
    return preferencesList.map((currentPreferences, i) => (
      <Preferences preferences={currentPreferences} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/preferences")
      .then(response => {
        setPreferencesList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>Preferences List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Noise Level</th>
            <th>Distance</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default PreferencesList;
