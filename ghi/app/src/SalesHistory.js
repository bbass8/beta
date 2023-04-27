import React, { useState } from "react";

function SalesHistory(props) {
    const [salesPerson, setSalesPerson] = useState('');
    const [SalesHistory, setSalesHistory] = useState('');
    const [sales, setSales] = useState([]);


    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
        handleSalesHistoryChange(value);
    };
    let employeeSales = []
    const handleSalesHistoryChange = (salespersonid) => {

        let allSales = props.sales

        for (let sale of allSales) {
            if (sale.salesperson.employee_id === salespersonid){
                employeeSales.push(sale)
            }
        }

        setSalesHistory(employeeSales);


    };

    function SalesHistoryList() {
      return (
        SalesHistory ? (

          <div>
          <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {SalesHistory && SalesHistory.map(employeeSale => {
                  console.log(employeeSale);
                    return (
                    <tr key={employeeSale.id}>
                        <td>{employeeSale.salesperson.first_name} {employeeSale.salesperson.last_name}</td>
                        <td>{employeeSale.customer.first_name} {employeeSale.customer.last_name}</td>
                        <td>{employeeSale.automobile.vin}</td>
                        <td>{employeeSale.price}</td>
                    </tr>
                    );
                })}
            </tbody>
          </table>
        </div>
          ) : null
      );

    }
    // We set sales history to a unique array with all of the sales from the employee that we clicked
    // on our dropdown.
    // Now in the function handleSalesHistroyChange we set sales history; before we did this sales histroy is an empty
    // string. Once that becomes something different than an empty string we have to render the array of objects
    // or sales history to a table.




    return (
      <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Sales Person History</h1>

                <div className="form-floating mb-3">
                  <select

                    onChange={handleSalesPersonChange}
                    placeholder="Salesperson"
                    required
                    type="text"
                    name="Salesperson"
                    id="Salesperson"
                    className="form-control"
                  >
                    <option value={salesPerson}>Select a Salesperson</option>
                    {props.salespersons && props.salespersons.map((salesperson) => {


                        return (
                            <option key={salesperson.first_name} value={salesperson.employee_id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                            );
                        })}

                  </select>
                </div>
        </div>
      </div>
    </div>
    {SalesHistoryList()}

    </>
    );
        }






    export default SalesHistory;
