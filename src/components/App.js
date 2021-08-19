import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(value) {
    setFilters({ type: value });
  }
  
  function onFindPetsClick() {
    fetch((filters.type === 'all') ? `http://localhost:3001/pets` : `http://localhost:3001/pets?type=${filters.type}`)
    .then(resp => resp.json())
    .then(data => setPets(data))
  }

  function onAdoptPet(id) {
    setPets(
    pets.map((pet) =>
    (pet.id === id) ? { ...pet, isAdopted: true } : pet
    )
    );
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Component Hierarchy
//
// App 
// -- Filters
// -- PetBrowser
