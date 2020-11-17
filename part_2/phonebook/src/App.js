import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Success from "./components/Success";
import Error from "./components/Error";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const personsToShow = newFilter
    ? persons.filter((x) => newFilter === x.name.toLowerCase())
    : persons;

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      phone: newPhone,
    };

    const checkName = (obj) => {
      if (obj.name === newName) return obj.id;
    };

    const id = persons.some(checkName)
      ? persons.map((person) => checkName(person))
      : null;

    const personId = id ? id.filter((n) => n) : null;

    if (persons.some(checkName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook!, replace the old number with a new one?`
        )
      ) {
        personServices
          .update(personId[0], newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== personId[0] ? p : returnedPerson))
            );
            setSuccessMessage("AGREGADO.");
          })
          .catch((err) => {
            return setErrorMessage(
              "ERROR, ya se ha borrado el campo de la base de datos!."
            );
          });
      } else {
        return;
      }
      return;
    }

    personServices
      .create(newPerson)
      .then((person) => setPersons(persons.concat(person)))
      .then(setSuccessMessage("AGREGADO."));

    setNewName("");
    setNewPhone("");
  };

  const deletePerson = (id) => {
    console.log(id);
    if (
      window.confirm("Do you want to delete the person from the phonebook?")
    ) {
      personServices.deletePerson(id).catch((err) => {
        console.log(err);
        setErrorMessage(
          "ERROR, ya se ha borrado el campo de la base de datos!."
        );
      });
      setPersons(persons.filter((p) => p.id !== id));
      alert("DELETED");
    }
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Success successMessage={successMessage} />
      <Error errorMessage={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((x) => (
        <Person key={x.id} person={x} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default App;
