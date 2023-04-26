import React, { useState } from "react";

function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    };
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;



        const url = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
        },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const newCustomer = await response.json();
        event.target.reset();
    }
};

return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Customer!</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
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
            <div className="form-floating mb-3">
              <input
                value={address}
                onChange={handleAddressChange}
                placeholder="Address"
                required
                type="text"
                name="Address"
                id="Address"
                className="form-control"
              />
              <label htmlFor="Last Name">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
                required
                type="text"
                name="Phone Number"
                id="Phone Number"
                className="form-control"
              />
              <label htmlFor="Phone Number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
