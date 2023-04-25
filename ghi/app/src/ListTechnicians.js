
function ListTechnicians(props){
return (
    <table className="table table-striped">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
                </thead>
                <tbody>
                {props.technicians.map(tech => {
                  console.log()
                return (
                  <tr key={tech.first_name}>
                    <td>{tech.first_name}</td>
                    <td>{tech.last_name}</td>
                    <td>{tech.employee_id}</td>
                  </tr>
                     );
              })}
                </tbody>
            </table>
        );
        }

    export default ListTechnicians
