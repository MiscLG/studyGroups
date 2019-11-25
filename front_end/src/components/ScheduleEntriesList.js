import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ScheduleEntry = props => (
  <tr>
    <td>{props.scheduleEntry._id}</td>
    <td>{props.scheduleEntry.start_time}</td>
    <td>{props.scheduleEntry.end_time}</td>
    <td>{props.scheduleEntry.day}</td>
    <td>
      <Link to={"/scheduleEntry/edit/" + props.scheduleEntry._id}>Edit</Link>
    </td>
  </tr>
);

const ScheduleEntriesList = () => {
  const [scheduleEntryList, setScheduleEntryList] = useState([]);

  const list = () => {
    return scheduleEntryList.map((currentScheduleEntry, i) => (
      <ScheduleEntry scheduleEntry={currentScheduleEntry} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/scheduleEntries")
      .then(response => {
        setScheduleEntryList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>ScheduleEntry List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default ScheduleEntriesList;
