import React, {useState, useEffect} from 'react';
export default SaleForm;

function SaleForm() {
    const [vin, setVin] = useState({});
    const [automobile, setAutomobile] = useState('');
    const [customer, setCustomer] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [price, setPrice] = useState('');
    const [automobiles, setAutomobiles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [model, setModel] = useState([]);



    const handleVinChange = (event) => {
        const value = event.target.value;
        let data = JSON.parse(value);
        console.log(data);
        setVin(data.vin);
        setModel(data.model.name);



        // {value.map((automobile) => {
        //     setVin(automobile.vin)
        //     console.log(automobile);
        // });
    }



    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    };
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.automobile = model;
        data.vin = vin;
        data.customer = customer;
        data.salesperson = salesperson;
        data.price = parseInt(price);
        console.log(data);
        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            event.target.reset();
        }
    };

    const fetchAutomobileData = async () => {
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchAutomobileConfig = {
            method: 'get',
        };
        const automobileResponse = await fetch(automobileUrl, fetchAutomobileConfig);
        if (automobileResponse.ok) {
            const data = await automobileResponse.json();
            setAutomobiles(data.autos);
    }
    };
    const fetchCustomerData = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchCustomerConfig = {
            method: 'get',
        };
        const customerResponse = await fetch(customerUrl, fetchCustomerConfig);
        if (customerResponse.ok) {
            const data = await customerResponse.json();
            setCustomers(data.customers);
        };
    };
    const fetchSalespersonData = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchSalespersonConfig = {
            method: 'get',
        };
        const salesPersonResponse = await fetch(salespersonUrl, fetchSalespersonConfig);
        if (salesPersonResponse.ok) {
            const data = await salesPersonResponse.json();

            setSalespersons(data.salespersons);

        };
    };
    useEffect(() => {
        fetchAutomobileData();
        fetchCustomerData();
        fetchSalespersonData();
    },[]);



return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a Sale!</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="form-floating mb-3">
              <select

                onChange={handleVinChange}
                placeholder="Vin"
                required
                type="text"
                name="Vin"
                id="Vin"
                className="form-control"
              >
                <option value={automobile}>Select a Vin</option>
                {automobiles.map((automobile) => {

                    if (!automobile.sold) {
                    return (
                        <option key={automobile.vin} value={JSON.stringify(automobile)}>
                            {automobile.vin}
                        </option>
                        );}
                    })}

              </select>
              <label htmlFor="Vin">Vin</label>
            </div>
            <div className="form-floating mb-3">
              <select

                onChange={handleSalespersonChange}
                placeholder="Salesperson"
                required
                type="text"
                name="salesperson"
                id="salesperson"
                className="form-control"
              >
                <option value={salesperson}>Select a Salesperson</option>
                {salespersons.map((salesperson) => {

                    return (
                        <option key={salesperson.id} value={salesperson.first_name}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                        );}
                        )}
                </select>
              <label htmlFor="salesperson">Salesperson</label>
            </div>
            <div className="form-floating mb-3">
              <select

                onChange={handleCustomerChange}
                placeholder="Customer"
                required
                type="text"
                name="Customer"
                id="Customer"
                className="form-control"
              >
                <option value={customer}>Select a Customer</option>
                {customers.map((customer) => {
                    return (
                        <option key={customer.id} value={customer.first_name}>
                            {customer.first_name} {customer.last_name}
                        </option>
                        );}
                        )}
                </select>
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={price}
                onChange={handlePriceChange}
                placeholder="Price"
                required
                type="text"
                name="Price"
                id="Price"
                className="form-control"
              />
              <label htmlFor="Price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};
