import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AddTechnician from './AddTechnician';
import ListTechnicians from './ListTechnicians';
import CreateAppointment from './CreateAppointment'
import Nav from './Nav';
import ListAppointments from './ListAppointments';
import ServiceHistory from './ServiceHistory'

function App(props) {
  return (

    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/">
            <Route path="" element={<ListTechnicians technicians = {props.technicians}/>} />
            <Route path="add" element={<AddTechnician />} />
          </Route>
          <Route path="appointments/">
          <Route path="" element={<ListAppointments appointments={props.appointments}/>} />
          <Route path="add/" element={<CreateAppointment />} />
          <Route path="servicehistory/" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
