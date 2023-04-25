
function ListSalesPeople(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {props.salespersons.map(salesperson => {
                    return (
                    <tr key={salesperson.first_name}>
                        <td>{salesperson.employee_id}</td>
                        <td>{salesperson.first_name}</td>
                        <td>{salesperson.last_name}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
export default ListSalesPeople
