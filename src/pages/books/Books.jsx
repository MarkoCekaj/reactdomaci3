import React, { useState, useReducer } from "react";
import BooksForm from "./BooksForm";
import BooksGrid from "./BooksGrid";
import booksList from "../../context/booksContext/booksList";
import BooksData from "../../context/booksContext/BooksData";
import Button from "react-bootstrap/Button";
const changeBooks = (state, action) => {
  switch (action.type) {
    case "add":
      const newId = booksList.length;
      return [
        ...booksList,
        { id: newId, name: action.data.name, year: action.data.year },
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
const Books = () => {
  const [isGridInView, setIsGridInView] = useState(true);
  const [bookList, dispatch] = useReducer(changeBooks, booksList);
  const [selectedRow, setSelectedRow] = useState({});
  const onRowClick = (e) => {
    setSelectedRow(e);
    setIsGridInView(false);
  };

  return (
    <BooksData.Provider
      value={{ list: bookList, dispatch: (e) => dispatch(e) }}
    >
      <div>
        <div className="booksUpdateButtons">
          <div>
            <Button onClick={() => setIsGridInView(true)}>Show books</Button>
          </div>
          <div>
            <Button onClick={() => setIsGridInView(false)}>Add book</Button>
          </div>
          <div onClick={() => setIsGridInView(false)}>
            <Button>Update book</Button>
          </div>
        </div>
        <div>
          {isGridInView ? (
            <BooksGrid onRowClick={onRowClick} />
          ) : (
            <BooksForm
              returnToGrid={() => {
                setIsGridInView(true);
                setSelectedRow({});
              }}
              data={selectedRow}
            />
          )}
        </div>
      </div>
    </BooksData.Provider>
  );
};
export default Books;
