import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ListSales from './SalesList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export async function loadSalesPeople(){
  const response = await fetch('http://localhost:8090/api/salespeople/');
  if(response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App salespersons={data.salespersons} />
      </React.StrictMode>
    )
  }
  else {
    console.error(response);
  }
}
loadSalesPeople();

export async function loadCustomers() {
  const response = await fetch('http://localhost:8090/api/customers/');
  if(response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App customers={data.customers} />
      </React.StrictMode>
      )
  }
  else {
    console.error(response);
  }
}

loadCustomers();

export async function loadSales() {
  const response = await fetch('http://localhost:8090/api/sales/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App sales={data.sales} />
      </React.StrictMode>
      )
    }
    else {
      console.error(response);
  }
}

loadSales();
