import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    postcode: "",
    capacity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/vpp/battery/" + id)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8080/vpp/battery/" + id, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
      <h1>Update battery</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={values.name}
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
            value={values.postcode}
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
            value={values.capacity}
            onChange={(e) => setValues({ ...values, capacity: e.target.value })}
          />
        </div>
        <button className="btn btn-success">Update</button>
        <Link to="/" className="btn btn-primary ms-3">
          Back
        </Link>
      </form>
    </div>
  );
}

export default Update;
