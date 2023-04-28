import React, { useState } from "react";

function ServiceHistory() {
  const [search, setSearch] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [vins, setVins] = useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (search.length != 17) {
      setErrorMessage("VINs are 17 characters long.");
    } else {
      const responseAppointments = await fetch(
        `http://localhost:8080/api/appointments/vin/${search}/`
      );
      if (responseAppointments.ok) {
        const data = await responseAppointments.json();
        setVins(data);
      }
    }
  };
  return (
    <>
      {" "}
      <h1>Service History</h1>
      <div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          id="create-technician-form"
        >
          <div
            className="form-floating mb-3"
            style={{ paddingRight: "15px", display: "inline-block" }}
          >
            <input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
              required
              type="text"
              name="search"
              id="search"
              className="form-control"
            />
            <label htmlFor="search">Search for VIN</label>
            {errorMessage && (
              <p style={{ color: "red" }} className="error">
                {" "}
                {errorMessage}{" "}
              </p>
            )}
          </div>

          <button>Search</button>
        </form>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>is VIP?</th>
            <th>Customer</th>
            <th>Date/Time</th>
            <th>Reason</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vins.map((appointment) => {
            let unformattedDate = new Date(appointment.date_time);
            let date = unformattedDate.toLocaleString();
            return (
              <tr key={appointment.date_time}>
                <td>{appointment.vin}</td>
                <td>{appointment.vip ? "Yes" : "No"}</td>
                <td>{appointment.customer}</td>
                <td>{date}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.technician.first_name}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ServiceHistory;
