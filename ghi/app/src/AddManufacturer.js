import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTechnician() {
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState("");

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = manufacturer;

    const locationUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      event.target.reset();
      setManufacturer("");
    }
    navigate("/inventory/manufacturers");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new manufacturer!</h1>
          <form
            onSubmit={(event) => handleSubmit(event)}
            id="create-manufacturer-form"
          >
            <div className="form-floating mb-3">
              <input
                value={manufacturer}
                onChange={handleManufacturerChange}
                placeholder="Manufacturer"
                required
                type="text"
                name="manufacturer"
                id="manufacturer"
                className="form-control"
              />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
