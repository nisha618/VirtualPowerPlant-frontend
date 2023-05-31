import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState({ list: [] });

  const [values, setValues] = useState({
    postcodeFrom: "",
    postcodeTo: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/vpp/battery/")
      .then((res) => {
        setData(res.data);
        localStorage.setItem("data", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      axios
        .delete("http://localhost:8080/vpp/battery/" + id)
        .then((_res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const search = () => {
    axios
      .get(
        "http://localhost:8080/vpp/battery/" +
          values.postcodeFrom +
          "/" +
          values.postcodeTo
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  if (data === { list: [] }) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Batteries</h1>
      <div className="w-50 rounded bg-white border shadow p-4">
        <button type="button" className="btn btn-outline-success">
          <Link to="/create">Add +</Link>
        </button>
        <div className="d-flex justify-content-between">
          <div>
            <label className="me-2" htmlFor="postcodeFrom">
              Postcode From
            </label>
            <input
              type="number"
              name="postcodeFrom"
              placeholder="Enter Postcode From"
              onChange={(e) =>
                setValues({ ...values, postcodeFrom: e.target.value })
              }
            />
          </div>
          <div>
            <label className="me-2" htmlFor="postcodeTo">
              Postcode To
            </label>
            <input
              type="number"
              name="postcodeTo"
              placeholder="Enter Postcode To"
              onChange={(e) =>
                setValues({ ...values, postcodeTo: e.target.value })
              }
            />
          </div>
          <button type="button" onClick={search} className="btn btn-primary">
            Search
          </button>
        </div>
        <div className="d-flex justify-content-start">
          <p className="me-2 my-2 pe-2 py-2">
            Total Capacity: {data?.total || `-`}
          </p>
          <p className="m-2 p-2">Average Capacity: {data?.average || `-`}</p>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Postcode</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.list.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.postcode}</td>
                <td>{d.capacity}</td>
                <td>
                  <Link
                    to={`/view/${d.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
