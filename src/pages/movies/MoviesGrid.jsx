import MoviesData from "../../context/movieContext/MoviesData";
import { useContext } from "react";
import TableContent from "../../components/table/Table";

const MovieGrid = ({ onRowClick }) => {
  const { list } = useContext(MoviesData);
  const header = ["id", "Title", "Year"];

  return (
    <div>
      <TableContent header={header} rows={list} onRowClick={onRowClick} />
    </div>
  );
};

export default MovieGrid;
