import { useEffect, useState } from "react";

export async function loadManufacturers(){
  const responseManufacturers = await fetch('http://localhost:8100/api/manufacturers/');
  if (responseManufacturers.ok){
      const dataManufacturers = await responseManufacturers.json();
      let manufacturers= dataManufacturers.manufacturers
      return manufacturers
  }
  else {
    console.error(responseManufacturers);
  }
}





function ListManufacturers(){

  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const manufacturersData = await loadManufacturers();
      setManufacturers(manufacturersData);
    }
    fetchData();
  }, []);

return (
    <table className="table table-striped">
                <thead>
                <tr>
                    <th>Manufacturer Name</th>

                </tr>
                </thead>
                <tbody>
                {manufacturers.map(manufacturer => {
                return (

                  <tr key={manufacturer.name}>
                    <td>{manufacturer.name}</td>

                  </tr>
                     );
              })}
                </tbody>
            </table>
        );
        }

    export default ListManufacturers
