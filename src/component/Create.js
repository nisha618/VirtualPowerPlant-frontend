import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const [values, setValues] = useState({
    name: "",
    postcode: "",
    capacity: "",
  });

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/vpp/battery/", values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
      <h1>Add a battery</h1>
      <form onSubmit={handleSave}>
        <div className="mb-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="number"
            name="postcode"
            className="form-control"
            placeholder="Enter Postcode"
            onChange={(e) => setValues({ ...values, postcode: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="capacity">Capcity:</label>
          <input
            type="number"
            name="capacity"
            className="form-control"
            placeholder="Enter Capacity"
            onChange={(e) => setValues({ ...values, capacity: e.target.value })}
          />
        </div>
        <div>
          <button className="btn btn-success">Save</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Create;
