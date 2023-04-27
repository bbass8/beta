

function ListSales(props) {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.sales && props.sales.map(sale => {
                    return (
                    <tr key={sale.automobile.vin}>
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{sale.price.toString()}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
export default ListSales;
