import React, { useState } from "react";

function SalesPersonForm() {
    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    };
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.employee_id = employeeId;
        data.first_name = firstName;
        data.last_name = lastName;




        const url = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const newSalesPerson = await response.json();
          event.target.reset();
        }


        setFirstName('');
        setLastName('');
        setEmployeeId('');

      };

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Sales Person!</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                  <input
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                    placeholder="Employee Id"
                    required
                    type="text"
                    name="Employee Id"
                    id="Employee Id"
                    className="form-control"
                  />
                  <label htmlFor="Employee Id">Employee Id</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First Name"
                    required
                    type="text"
                    name="First Name"
                    id="First Name"
                    className="form-control"
                  />
                  <label htmlFor="First Name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={lastName}
                    onChange={handleLastNameChange}
                    placeholder="Last Name"
                    required
                    type="text"
                    name="Last Name"
                    id="Last Name"
                    className="form-control"
                  />
                  <label htmlFor="Last Name">Last Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    export default SalesPersonForm;
