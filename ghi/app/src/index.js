import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export async function loadData() {
  const responseTechnicians = await fetch(
    "http://localhost:8080/api/technicians/"
  );
  const responseAppointments = await fetch(
    "http://localhost:8080/api/appointments/"
  );
  const salesPeopleResponse = await fetch(
    "http://localhost:8090/api/salespeople/"
  );
  const customerResponse = await fetch("http://localhost:8090/api/customers/");
  const salesResponse = await fetch("http://localhost:8090/api/sales/");

  if (
    salesPeopleResponse.ok &&
    customerResponse.ok &&
    salesResponse.ok &&
    responseTechnicians.ok &&
    responseAppointments.ok
  ) {
    const salesPeopleData = await salesPeopleResponse.json();
    const customerData = await customerResponse.json();
    const salesData = await salesResponse.json();
    const dataTechnicians = await responseTechnicians.json();
    const dataAppointments = await responseAppointments.json();
    root.render(
      <React.StrictMode>
        <App
          salespersons={salesPeopleData.salespersons}
          customers={customerData.customers}
          sales={salesData.sales}
          technicians={dataTechnicians.technicians}
          appointments={dataAppointments.appointments}
        />
      </React.StrictMode>
    );
  } else {
    console.error(salesResponse);
  }
}

loadData();
