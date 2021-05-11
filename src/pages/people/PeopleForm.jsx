import React, { useState, useContext } from "react";
import PeopleData from "../../context/peopleContext/PeopleData";
import Button from "react-bootstrap/Button";
import "./style/PeopleStyle.css";
const PeopleForm = ({ returnToGrid, data }) => {
  const { dispatch } = useContext(PeopleData);
  const [name, setName] = useState(data?.name ? data?.name : "");
  const [surname, setSurname] = useState(data?.surname ? data?.surname : "");
  const [age, setAge] = useState(data?.age ? data?.age : 1990);
  const onSave = () => {
    if (data?.id) {
      dispatch({
        type: "edit",
        data: { id: data?.id, name: name, surname: surname, age: age },
      });
    } else {
      dispatch({
        type: "add",
        data: { name: name, surname: surname, age: age },
      });
    }
    returnToGrid();
  };

  return (
    <div className="peopleUpdateInput">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="number"
        placeholder="Title"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Button onClick={() => onSave()}>Save</Button>
    </div>
  );
};
export default PeopleForm;
