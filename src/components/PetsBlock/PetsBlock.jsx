import React from "react";
import AddPet from "../AddPet/AddPet";

const PetsBlock = ({ pets }) => {
  return (
    <div>
      <h2>My Pets</h2>
      <AddPet />
      <ul>
        {!pets || pets.length === 0 ? (
          <p>No pets available</p>
        ) : (
          pets.map((pet) => (
            <li key={pet._id}>
              <img src={pet.imgURL} alt={pet.name} />
              <p>{pet.name}</p>
              <p>{pet.birthday}</p>
              <p>{pet.sex}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PetsBlock;
