import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EditStudent = props => {
  const [state, setState] = useState({
    _id: 0,
    student_name: "",
    _student_address: "",
    _student_schedule: "",
    _student_preferences: ""
  });
  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const student = {
      _id: state._id,
      student_name: state.student_name,
      _student_address: state._student_address,
      // _student_schedule: state._student_schedule.split(","),
      _student_preferences: state._student_preferences
    };
    console.log(student);
    await axios
      .post(
        "http://localhost:4000/students/update/" + props.match.params.id,
        student
      )
      .then(res => console.log(res.data));

    props.history.push("/");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/students/" + props.match.params.id)
      .then(response => {
        setState({
          _id: response.data._id,
          student_name: response.data.student_name,
          _student_address: response.data._student_address,
          _student_schedule: response.data._student_schedule,
          _student_preferences: response.data._student_preferences
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Student ID: {state._id}</label>
        </div>
        {/* <div className="form-group">
          <label>Student ID: </label>
          <input
            type="number"
            className="form-control"
            name="_id"
            value={state._id}
            onChange={handleInput}
          />
        </div> */}
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control"
            name="student_name"
            value={state.student_name}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Schedule Keys: </label>
          <input
            type="text"
            className="form-control"
            name="_student_schedule"
            value={state._student_schedule}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Preferences Key: </label>
          <input
            type="text"
            className="form-control"
            name="_student_preferences"
            value={state._student_preferences}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Address Key: </label>
          <input
            type="text"
            className="form-control"
            name="_student_address"
            value={state._student_address}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Student"
            className="btn btn-primary"
          />
        </div>
      </form>
      {/* {state._student_schedule.split(",").map((scheduleEntry, index) => {
        return (
          <Link to={`scheduleEntries/edit/${scheduleEntry}`}>
            Edit Schedule Entry {index}
          </Link>
        );
      })} */}
      <Link to={`/preferences/edit/${state._student_preferences}`}>
        Edit Preferences
      </Link>
      <Link to={"/address/edit/" + state._student_address}>Edit Address</Link>
    </div>
  );
};

export default EditStudent;
