import { useEffect, useState } from "react";

export async function loadAutomobiles() {
  const responseAutomobiles = await fetch(
    "http://localhost:8100/api/automobiles/"
  );
  if (responseAutomobiles.ok) {
    const dataAutomobiles = await responseAutomobiles.json();
    let automobiles = dataAutomobiles.autos;
    return automobiles;
  } else {
    console.error(responseAutomobiles);
  }
}

function ListAutomobiles() {
  const [automobiles, setAutomobiles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const automobilesData = await loadAutomobiles();
      setAutomobiles(automobilesData);
    }
    fetchData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {automobiles.map((automobile) => {
          return (
            <tr key={automobile.vin}>
              <td>{automobile.vin}</td>
              <td>{automobile.color}</td>
              <td>{automobile.year}</td>
              <td>{automobile.model.name}</td>
              <td>{automobile.model.manufacturer.name}</td>
              <td>{automobile.sold ? "Yes" : "No"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ListAutomobiles;
