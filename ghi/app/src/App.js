import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AddTechnician from './AddTechnician';
import Nav from './Nav';
import ListSalesPeople from './SalespersonList';
import SalesPersonForm from './SalespersonForm';
import ListCustomers from './CustomerList';
import CustomerForm from './CustomerForm';
import ListSales from './SalesList';
import SaleForm from './SaleForm';

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
          <Route path="customers/" element={<ListCustomers customers={props.customers}/>} />
          <Route path="addcustomer/" element={<CustomerForm />} />
          <Route path="sales/" element={<ListSales sales={props.sales}/>} />
          <Route path="addsale/" element={<SaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
