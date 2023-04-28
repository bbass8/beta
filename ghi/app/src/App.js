import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AddTechnician from "./AddTechnician";
import ListTechnicians from "./ListTechnicians";
import CreateAppointment from "./CreateAppointment";
import Nav from "./Nav";
import ListAppointments from "./ListAppointments";
import ServiceHistory from "./ServiceHistory";
import ListManufacturers from "./ListManufacturers";
import AddManufacturer from "./AddManufacturer";
import ListModels from "./ListModels";
import AddModel from "./AddModel";
import ListAutomobiles from "./ListAutomobiles";
import AddAutomobile from "./AddAutomobile";
import ListSalesPeople from "./SalespersonList";
import SalesPersonForm from "./SalespersonForm";
import ListCustomers from "./CustomerList";
import CustomerForm from "./CustomerForm";
import ListSales from "./SalesList";
import SaleForm from "./SaleForm";
import SalesHistory from "./SalesHistory";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/">
            <Route
              path=""
              element={<ListTechnicians technicians={props.technicians} />}
            />
            <Route path="add" element={<AddTechnician />} />
          </Route>
          <Route path="appointments/">
            <Route
              path=""
              element={<ListAppointments appointments={props.appointments} />}
            />
            <Route path="add/" element={<CreateAppointment />} />
            <Route path="servicehistory/" element={<ServiceHistory />} />
          </Route>
          <Route path="inventory/">
            <Route path="addmanufacturer/" element={<AddManufacturer />} />
            <Route path="manufacturers/" element={<ListManufacturers />} />
            <Route path="models/" element={<ListModels />} />
            <Route path="addmodel/" element={<AddModel />} />
            <Route path="automobiles/" element={<ListAutomobiles />} />
            <Route path="addautomobile/" element={<AddAutomobile />} />
          </Route>
          <Route
            path="salespersons/"
            element={<ListSalesPeople salespersons={props.salespersons} />}
          />
          <Route path="addsalesperson/" element={<SalesPersonForm />} />
          <Route
            path="customers/"
            element={<ListCustomers customers={props.customers} />}
          />
          <Route path="addcustomer/" element={<CustomerForm />} />
          <Route path="sales/" element={<ListSales sales={props.sales} />} />
          <Route path="addsale/" element={<SaleForm />} />
          <Route
            path="saleshistory/"
            element={
              <SalesHistory
                salespersons={props.salespersons}
                sales={props.sales}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
