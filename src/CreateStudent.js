import React, { useState } from "react";

import { CreateAddressNested, CreateAddress } from "./CreateAddress";

const CreateStudent = () => {
  const [state, setState] = useState({
    id: 0,
    name: "",
    address: {
      name: "",
      street: "",
      city: "",
      zip: 0
    }
  });

  const resetState = () => {
    setState({
      id: 0,
      name: "",
      address: {
        name: "",
        street: "",
        city: "",
        zip: 0
      }
    });
  };
  const handleInput = event => {
    let field = event.target;
    setState({ ...state, [field.name]: field.value });
  };

  const handleAddressInput = event => {
    let field = event.target;
    setState({
      ...state,
      address: {
        ...state.address,
        [field.name]: field.value
      }
    });
  };

  const getAddress = childState => {
    console.log({ ...childState });
    setState({
      ...state,
      address: childState
    });
    console.log(state.address);
  };

  const logInput = () => {
    const address = state.address;
    console.log(`Form submitted:`);
    console.log(`Student ID: ${state.id}`);
    console.log(`Name: ${state.name}`);
    console.log(
      `Address: ${address.name} ${address.street} ${address.city} ${address.zip}`
    );
  };
  const handleSubmit = event => {
    event.preventDefault();
    logInput();
    resetState();
  };
  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID: </label>
          <input
            type="number"
            className="form-control"
            name="id"
            value={state.id}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
        </div>
        <h4>Address</h4>
        <CreateAddressNested
          {...state.address}
          submit={getAddress}
          handleInput={handleAddressInput}
        />
        <div className="form-group">
          <input
            type="submit"
            value="Create Student"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
