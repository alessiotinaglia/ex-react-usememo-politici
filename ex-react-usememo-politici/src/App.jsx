import { useEffect, useState } from 'react';

function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []);

  console.log(politicians);
  

  return (
    <>
      <div>
        <h1>Lista dei politici</h1>
        <div className="politicians-container">
          {politicians.map(politician => (
            <div key={politician.id} className="politician-card">
              <img src={politician.image} alt={politician.name} width={150} />
              <h2>{politician.name}</h2>
              <h4>{politician.position}</h4>
              <p>{politician.biography}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PoliticiansList;
