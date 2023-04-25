import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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
