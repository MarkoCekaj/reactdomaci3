import BooksData from "../../context/booksContext/BooksData";
import { useContext } from "react";
import TableContent from "../../components/table/Table";

const BookGrid = ({ onRowClick }) => {
  const { list } = useContext(BooksData);
  const header = ["id", "Title", "Year"];

  return (
    <div>
      <TableContent header={header} rows={list} onRowClick={onRowClick} />
    </div>
  );
};

export default BookGrid;
