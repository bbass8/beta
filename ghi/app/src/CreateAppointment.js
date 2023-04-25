import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { loadTechnicians } from './index';


export default function CreateAppointment() {

    const navigate = useNavigate();
    const [techs, setTechs] = useState([]);
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [tech, setTech] = useState([]);

    const handleVinChange = (event) =>{
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) =>{
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange = (event) =>{
        const value = event.target.value;
        setDate(value);
    }
    const handleReasonChange = (event) =>{
      const value = event.target.value;
      setReason(value);
    }

    const handleTechChange = (event) =>{
      const value = event.target.value;
      setTech(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data ={}
        data.vin = vin;
        data.customer = customer;
        data.date_time = date;
        data.reason = reason;
        data.technician = tech;

        console.log(data);

        const locationUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
            const newTech = await response.json();
            console.log(newTech)
            event.target.reset();
            setVin('');
            setCustomer('');
            setDate('')
            setReason('')

            }
        loadTechnicians();
        navigate('/appointments');
    }

    const fetchData = async () =>{
      const url = 'http://localhost:8080/api/technicians/'
      const response = await fetch(url);

      if (response.ok){
        const data = await response.json();
        setTechs(data.technicians);

      }
    }
    useEffect(()=>{
      fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new appointment!</h1>
            <form onSubmit={(event) => handleSubmit(event)} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={vin} onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={customer} onChange={handleCustomerChange} placeholder="Customer Name" required type="text" name="customer" id="customer" className="form-control"/>
                <label htmlFor="customer">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={date} onChange={handleDateChange} placeholder="Date" required type="datetime-local" name="date" id="date" className="form-control"/>
                <label htmlFor="date">Date and Time</label>
              </div>
              <div className="form-floating mb-3">
                <input value={reason} onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
                <label htmlFor="color">Reason for appointment</label>
              </div>
                  <select onChange={handleTechChange} required id="tech" name="tech" className="form-select">
                  <option value="">Choose a tech</option>
                  {techs.map(tech =>{
                    return (
                        <option key={tech.employee_id} value={tech.employee_id}>
                            {tech.first_name}
                              </option>
                      )
                    })}
              </select>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
};
