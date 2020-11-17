import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <ul>
        <li>
          {person.name} {person.phone}
          <button onClick={() => deletePerson(person.id)}>BORRAR</button>
        </li>
      </ul>
    </div>
  );
};

export default Person;
