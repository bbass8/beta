import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ListManufacturers from './ListManufacturers'
import ListSales from './SalesList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


export async function loadTechnicians(){
  const responseTechnicians = await fetch('http://localhost:8080/api/technicians/');
  const responseAppointments = await fetch('http://localhost:8080/api/appointments/');
  if (responseTechnicians.ok && responseAppointments.ok) {
      const dataTechnicians = await responseTechnicians.json();
      const dataAppointments = await responseAppointments.json();
      root.render(
          <React.StrictMode>
            <App technicians={dataTechnicians.technicians} appointments={dataAppointments.appointments}/>
          </React.StrictMode>
        )
  }
  else {
    console.error(responseTechnicians);
  }
}

loadTechnicians();

export async function loadData(){
  const salesPeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
  const customerResponse = await fetch('http://localhost:8090/api/customers/');
  const salesResponse = await fetch('http://localhost:8090/api/sales/');

  if(salesPeopleResponse.ok && customerResponse.ok && salesResponse.ok ) {
    const salesPeopleData = await salesPeopleResponse.json();
    const customerData = await customerResponse.json();
    const salesData = await salesResponse.json();
    root.render(
      <React.StrictMode>
        <App salespersons={salesPeopleData.salespersons} customers={customerData.customers}
        sales={salesData.sales} />
      </React.StrictMode>
    )
  }
  else {
    console.error(salesResponse);
  }
}

loadData();



// loadSalesPeople();

// export async function loadCustomers() {
//   const response = await fetch('http://localhost:8090/api/customers/');
//   if(response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App customers={data.customers} />
//       </React.StrictMode>
//       )
//   }
//   else {
//     console.error(response);
//   }
// }

// loadCustomers();

// export async function loadSales() {
//   const response = await fetch('http://localhost:8090/api/sales/');
//   if (response.ok) {
//     const data = await response.json();
//     root.render(
//       <React.StrictMode>
//         <App sales={data.sales} />
//       </React.StrictMode>
//       )
//     }
//     else {
//       console.error(response);
//   }
// }

// loadSales();
