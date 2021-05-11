import React, { useState, useReducer } from "react";
import PeopleForm from "./PeopleForm";
import PeopleGrid from "./PeopleGrid";
import peopleList from "../../context/peopleContext/peopleList";
import PeopleData from "../../context/peopleContext/PeopleData";
import Button from "react-bootstrap/Button";

const changePeople = (state, action) => {
  switch (action.type) {
    case "add":
      const newId = peopleList.length;
      return [
        ...peopleList,
        {
          id: newId,
          name: action.data.name,
          surname: action.data.surname,
          age: action.data.age,
        },
      ];
    case "edit":
      return state.map((item) => {
        if (item.id === action.data.id) {
          return action.data;
        }
        return item;
      });
    default:
      return;
  }
};
const People = () => {
  const [isGridInView, setIsGridInView] = useState(true);
  const [personList, dispatch] = useReducer(changePeople, peopleList);
  const [selectedRow, setSelectedRow] = useState({});
  const onRowClick = (e) => {
    setSelectedRow(e);
    setIsGridInView(false);
  };

  return (
    <PeopleData.Provider
      value={{ list: personList, dispatch: (e) => dispatch(e) }}
    >
      <div>
        <div className="peopleUpdateButtons">
          <div>
            <Button onClick={() => setIsGridInView(true)}>Show People</Button>
          </div>
          <div>
            <Button onClick={() => setIsGridInView(false)}>Add person</Button>
          </div>
          <div onClick={() => setIsGridInView(false)}>
            <Button>Update people</Button>
          </div>
        </div>

        <div>
          {isGridInView ? (
            <PeopleGrid onRowClick={onRowClick} />
          ) : (
            <PeopleForm
              returnToGrid={() => {
                setIsGridInView(true);
                setSelectedRow({});
              }}
              data={selectedRow}
            />
          )}
        </div>
      </div>
    </PeopleData.Provider>
  );
};
export default People;
