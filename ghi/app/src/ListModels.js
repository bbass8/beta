import { useEffect, useState } from "react";

export async function loadModels(){
  const responseModels = await fetch('http://localhost:8100/api/models/');
  if (responseModels.ok){
      const dataModels = await responseModels.json();
      let models= dataModels.models
      return models
  }
  else {
    console.error(responseModels);
  }
}





function ListModels(){

  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const modelsData = await loadModels();
      setModels(modelsData);
    }
    fetchData();
  }, []);

return (
    <table className="table table-striped">
                <thead>
                <tr>
                    <th>Model Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>

                </tr>
                </thead>
                <tbody>
                {models.map(model => {
                return (

                  <tr key={model.name}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.name}</td>
                    <td><img
                    src={model.picture_url}
                    width="150"
                    height="100"
                  /></td>

                  </tr>
                     );
              })}
                </tbody>
            </table>
        );
        }

    export default ListModels
