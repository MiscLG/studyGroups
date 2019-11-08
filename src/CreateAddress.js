import React, { useState } from "react";

const CreateAddress = () => {
  const [state, setState] = useState({
    name: "",
    street: "",
    city: "",
    zip: 0
  });

  const resetState = () => {
    setState({
      name: "",
      street: "",
      city: "",
      zip: 0
    });
  };

  const logInput = () => {
    console.log(state);
    console.log(`Form submitted:`);
    console.log(`Name: ${state.name}`);
    console.log(`Street: ${state.street}`);
    console.log(`City: ${state.city}`);
    console.log(`ZIP: ${state.zip}`);
  };
  const handleSubmit = event => {
    event.preventDefault();
    logInput();
    resetState();
  };

  const handleInput = event => {
    const field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Address</h3>
      <form onSubmit={handleSubmit}>
        <CreateAddressNested {...state} handleInput={handleInput} />
        <div className="form-group">
          <input
            type="submit"
            value="Create Address"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

const CreateAddressNested = props => {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="form-group">
        <label>Name: </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={props.name}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>Street: </label>
        <input
          type="text"
          className="form-control"
          name="street"
          value={props.street}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>City: </label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={props.city}
          onChange={props.handleInput}
        />
      </div>
      <div className="form-group">
        <label>ZIP: </label>
        <input
          type="number"
          className="form-control"
          name="zip"
          value={props.zip}
          onChange={props.handleInput}
        />
      </div>
    </div>
  );
};
export { CreateAddress, CreateAddressNested };
