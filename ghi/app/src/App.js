import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AddTechnician from './AddTechnician';
import Nav from './Nav';
import ListSalesPeople from './SalespersonList';
import SalesPersonForm from './SalespersonForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="addtechnician/" element={<AddTechnician />} />
          <Route path="salespersons/" element={<ListSalesPeople salespersons={props.salespersons}/>} />
          <Route path="addsalesperson/" element={<SalesPersonForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
