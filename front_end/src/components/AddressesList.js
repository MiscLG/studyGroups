import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Address = props => (
  <tr>
    <td>{props.address._id}</td>
    <td>{props.address.address_name}</td>
    <td>{props.address.address_street}</td>
    <td>{props.address.address_city}</td>
    <td>{props.address.address_zip}</td>
    <td>
      <Link to={"/address/edit/" + props.address._id}>Edit</Link>
    </td>
  </tr>
);

const AddressesList = () => {
  const [addressList, setAddressList] = useState([]);

  const list = () => {
    return addressList.map((currentAddress, i) => (
      <Address address={currentAddress} key={i} />
    ));
  };

  const callDbApi = () => {
    axios
      .get("http://localhost:4000/addresses")
      .then(response => {
        console.log(response);
        setAddressList(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    callDbApi();
  }, []);

  return (
    <div>
      <h3>Address List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>DB Key</th>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>ZIP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{list()}</tbody>
      </table>
    </div>
  );
};

export default AddressesList;
