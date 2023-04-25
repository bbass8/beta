import { loadTechnicians } from "./index";
async function finish(event,id){
  event.preventDefault();
  const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {method:"put"});
  loadTechnicians();
}
async function cancel(event,id){
  event.preventDefault();
  const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {method:"put"});
  loadTechnicians();
}

function ListAppointments(props){
return (
    <table className="table table-striped">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>is VIP?</th>
                    <th>Customer</th>
                    <th>Date/Time</th>
                    <th>Reason</th>
                    <th>Technician</th>
                </tr>
                </thead>
                <tbody>
                {props.appointments.map(appointment => {
                let unformattedDate = new Date(appointment.date_time)
                let date = unformattedDate.toLocaleString();
                console.log(appointment)
                if (appointment.status === 'PENDING'){
                return (
                  <tr key={appointment.vin}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.vip ? 'Yes' : 'No'}</td>
                    <td>{appointment.customer}</td>
                    <td>{date}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.technician.first_name}</td>
                    <td><button style={{backgroundColor: "lightgreen"}} onClick={(event) => {
                      const confirmBox = window.confirm(
                        "Do you really want to finish this appointment?"
                      )
                      if (confirmBox === true) {
                        finish(event, appointment.id)
                      }
                    }}button>Finish</button>
                    <button style={{backgroundColor: "red"}} onClick={(event) => {
                      const confirmBox = window.confirm(
                        "Do you really want to cancel this appointment?"
                      )
                      if (confirmBox === true) {
                        cancel(event, appointment.id)
                      }
                    }}>Cancel</button></td>
                  </tr>
                     );
                }
              })}
                </tbody>
            </table>
        );
        }

    export default ListAppointments
