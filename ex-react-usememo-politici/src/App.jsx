import { useEffect, useMemo, useState } from 'react';

function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []);

  console.log(politicians);

  const filterPoliticians = useMemo(() => {
    politicians.filter(politician => {
      const isName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isBio = politician.biography.toLowerCase().includes(search.toLowerCase());
      return isBio || isName;
    })
  }, [politicians, search]);

  return (
    <>
      <div>
        <h1>Lista dei politici</h1>
        <input type="text"
          placeholder='cerca per nome o biografia'
          value={search}
          onChange={e => setSearch(e.target.value)} />
        <div className="politicians-container">
          {filterPoliticians.map(politician => (
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
