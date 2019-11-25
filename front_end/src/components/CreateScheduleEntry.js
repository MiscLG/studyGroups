import React, { useState } from "react";
import axios from "axios";
const CreateScheduleEntry = () => {
  const [state, setState] = useState({
    start_time: 0.0,
    end_time: 0.0,
    day: "M"
  });

  const resetState = () => {
    setState({
      start_time: 0.0,
      end_time: 0.0,
      day: "M"
    });
  };

  const logInput = () => {
    console.log(state);
    console.log(`Form submitted:`);
    console.log(`Start Time: ${state.start_time}`);
    console.log(`End Time: ${state.end_time}`);
    console.log(`day: ${state.day}`);
  };

  const makePostInstance = () => {
    return {
      start_time: state.start_time,
      end_time: state.end_time,
      day: state.day
    };
  };

  const callDbApi = () => {
    axios
      .post("http://localhost:4000/scheduleEntries/add", makePostInstance())
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
      <h3>Create New ScheduleEntry</h3>
      <form onSubmit={handleSubmit}>
        <CreateScheduleEntryNested {...state} handleInput={handleInput} />
        <div className="form-group">
          <input
            type="submit"
            value="Create Schedule Entry"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

const CreateScheduleEntryNested = props => {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="form-group">
        <label>Start Time: </label>
        <input
          type="number"
          className="form-control"
          name="start_time"
          value={props.start_time}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>End Time: </label>
        <input
          type="number"
          className="form-control"
          name="end_time"
          value={props.end_time}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>Day: </label>
        <select
          className="form-control"
          name="day"
          onChange={props.handleInput}
          value={props.day}
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
      {/* <div className="form-group">
        <label>Day: </label>
        <input
          type="text"
          className="form-control"
          name="day"
          value={props.day}
          onChange={props.handleInput}
        />
      </div> */}
    </div>
  );
};
export { CreateScheduleEntry, CreateScheduleEntryNested };
