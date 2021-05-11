import PeopleData from "../../context/peopleContext/PeopleData.jsx";
import { useContext } from "react";
import TableContent from "../../components/table/Table";

const PeopleGrid = ({ onRowClick }) => {
  const { list } = useContext(PeopleData);
  const header = ["id", "Name", "Surname", "Age"];

  return (
    <div>
      <TableContent header={header} rows={list} onRowClick={onRowClick} />
    </div>
  );
};

export default PeopleGrid;
