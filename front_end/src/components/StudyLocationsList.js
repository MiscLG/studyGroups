import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudyLocation = props => (
  <tr>
    <td>{props.studyLocation.studyLocation_name}</td>
    <td>{props.studyLocation.studyLocation_noise_level}</td>
    <td>{props.studyLocation.studyLocation_availability}</td>
    <td>{props.studyLocation._studyLocation_address}</td>
    <td>{props.studyLocation._studyLocation_schedule.join(",")}</td>
    <td>
      <Link to={"/studyLocation/edit/" + props.studyLocation._id}>Edit</Link>
    </td>
  </tr>
);

const StudyLocationList = () => {
  const [studyLocationList, setStudyLocationList] = useState([]);

  const list = () => {
    return studyLocationList.map((currentStudyLocation, i) => (
      <StudyLocation studyLocation={currentStudyLocation} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/studyLocations")
      .then(response => {
        setStudyLocationList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>StudyLocation List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Noise Level</th>
            <th>Availabilty</th>
            <th>Address</th>
            <th>Schedule Entries</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default StudyLocationList;
