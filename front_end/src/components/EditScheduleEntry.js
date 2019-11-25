import React, { useState, useEffect } from "react";
import axios from "axios";

const EditScheduleEntry = props => {
  const [state, setState] = useState({
    start_time: 0.0,
    end_time: 0.0,
    day: ""
  });

  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const scheduleEntry = {
      start_time: state.start_time,
      end_time: state.end_time,
      day: state.day
    };
    console.log(scheduleEntry);
    await axios
      .post(
        "http://localhost:4000/scheduleEntries/update/" + props.match.params.id,
        scheduleEntry
      )
      .then(res => {
        console.log(res.data);
      });

    props.history.push("/scheduleEntry");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/scheduleEntries/" + props.match.params.id)
      .then(response => {
        setState({
          start_time: response.data.start_time,
          end_time: response.data.end_time,
          day: response.data.day
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Schedule Entry</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10 }}>
          <div className="form-group">
            <label>Start Time: </label>
            <input
              type="number"
              className="form-control"
              name="start_time"
              value={state.start_time}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>End Time: </label>
            <input
              type="number"
              className="form-control"
              name="end_time"
              value={state.end_time}
              onChange={handleInput}
            />
          </div>
          {/* <div className="form-group">
            <label>Day: </label>
            <input
              type="text"
              className="form-control"
              name="day"
              value={state.day}
              onChange={handleInput}
            />
          </div> */}
          <div className="form-group">
            <label>Day: </label>
            <select
              className="form-control"
              name="day"
              onChange={handleInput}
              value={state.day}
            >
              <option value="M">Monday</option>
              <option value="T">Tuesday</option>
              <option value="W">Wednesday</option>
              <option value="Tu">Thursday</option>
              <option value="F">Friday</option>
              <option value="S">Saturday</option>
              <option value="Su">Sunday</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Update Schedule Entry"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditScheduleEntry;
