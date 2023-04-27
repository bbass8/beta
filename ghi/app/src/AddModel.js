import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { loadTechnicians } from './index';


export default function AddTechnician() {

    const navigate = useNavigate();
    const [manufacturers, setManufacturers] = useState([]);
    const [model, setModel] = useState('');
    const [picture, setPicture] = useState([]);
    const [manufacturer, setManufacturer] = useState('');



    const handleModelChange = (event) =>{
        const value = event.target.value;
        setModel(value);
    }
    const handlePictureChange = (event) =>{
      const value = event.target.value;
      setPicture(value);
  }
  const handleManufacturerChange = (event) =>{
    const value = event.target.value;
    setManufacturer(value);
  }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data ={}
        data.name = model;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        const locationUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {

            event.target.reset();
            setModel('');
            }
        navigate('/inventory/models');


    }
    const fetchData = async () =>{
      const url = 'http://localhost:8100/api/manufacturers/'
      const response = await fetch(url);

      if (response.ok){

        const data = await response.json();
        setManufacturers(data.manufacturers);
      }
    }

    useEffect(() => {
      fetchData();
      }, []);


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new model!</h1>
            <form onSubmit={(event) => handleSubmit(event)} id="create-model-form">
              <div className="form-floating mb-3">
                <input value={model} onChange={handleModelChange} placeholder="Model" required type="text" name="model" id="model" className="form-control"/>
                <label htmlFor="model">Model</label>
              </div>
              <div className="form-floating mb-3">
              <input value={picture} onChange={handlePictureChange} placeholder="Image" required type="url" name="picture" id="picture" className="form-control"/>
                <label htmlFor="picture">Image</label>
              </div>
              <div className="mb-3">
          <select onChange={handleManufacturerChange} required id="manufacturer" name="manufacturer" className="form-select">
          <option value="">Choose a manufacturer</option>
          {manufacturers.map(manufacturer =>{
                return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                    </option>
                )
              })}
              </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
};
