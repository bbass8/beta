import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadData } from "./index";

export default function AddTechnician() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setId] = useState("");

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleIdChange = (event) => {
    const value = event.target.value;
    setId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.employee_id = employeeId;

    const locationUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newTech = await response.json();
      event.target.reset();
      setFirstName("");
      setLastName("");
      setId("");
    }
    loadData();
    navigate("/technicians");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new technician!</h1>
          <form
            onSubmit={(event) => handleSubmit(event)}
            id="create-technician-form"
          >
            <div className="form-floating mb-3">
              <input
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
              />
              <label htmlFor="name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
              />
              <label htmlFor="manufacturer">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={employeeId}
                onChange={handleIdChange}
                placeholder="Employee ID"
                required
                type="text"
                name="employeeId"
                id="employeeId"
                className="form-control"
              />
              <label htmlFor="color">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
