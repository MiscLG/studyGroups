import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAddress = props => {
  const [state, setState] = useState({
    address_name: "",
    address_street: "",
    address_city: "",
    address_zip: ""
  });

  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const address = {
      address_name: state.address_name,
      address_street: state.address_street,
      address_city: state.address_city,
      address_zip: state.address_zip
    };
    console.log(address);
    await axios
      .post(
        "http://localhost:4000/addresses/update/" + props.match.params.id,
        address
      )
      .then(res => console.log(res.data));

    props.history.push("/address");
  };

  useEffect(() => {
    console.log(props);
    axios
      .get("http://localhost:4000/addresses/" + props.match.params.id)
      .then(response => {
        setState({
          address_name: response.data.address_name,
          address_street: response.data.address_street,
          address_city: response.data.address_city,
          address_zip: response.data.address_zip
        });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Update Address</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10 }}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              name="address_name"
              value={state.address_name}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>Street: </label>
            <input
              type="text"
              className="form-control"
              name="address_street"
              value={state.address_street}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>City: </label>
            <input
              type="text"
              className="form-control"
              name="address_city"
              value={state.address_city}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label>ZIP: </label>
            <input
              type="number"
              className="form-control"
              name="address_zip"
              value={state.address_zip}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Address"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
