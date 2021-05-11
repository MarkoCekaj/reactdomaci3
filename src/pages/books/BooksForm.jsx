import React, { useState, useContext } from "react";
import BooksData from "../../context/booksContext/BooksData";
import Button from "react-bootstrap/Button";
import "./style/BooksStyle.css";
const Form = ({ returnToGrid, data }) => {
  const { dispatch } = useContext(BooksData);
  const [title, setTitle] = useState(data?.title ? data?.title : "");
  const [year, setYear] = useState(data?.year ? data?.year : 2010);
  const onSave = () => {
    if (data?.id) {
      dispatch({
        type: "edit",
        data: { id: data?.id, name: title, year: year },
      });
    } else {
      dispatch({ type: "add", data: { name: title, year: year } });
    }
    returnToGrid();
  };

  return (
    <div className="booksUpdateInput">
      <input
        type="text"
        placeholder="Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Button onClick={() => onSave()}>Save</Button>
    </div>
  );
};
export default Form;
