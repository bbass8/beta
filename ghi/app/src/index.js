import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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
