import React, { useEffect, useMemo, useState } from 'react';


const PoliticianCard = React.memo(({ name, image, position, biography }) => {
  return (
    <div className="politician-card">
      <img src={image} alt={name} width={150} />
      <h2>{name}</h2>
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  );
})



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
            <PoliticianCard key={politician.id} {...politician} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PoliticiansList;
