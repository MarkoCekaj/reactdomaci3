import React, { useState, useContext } from "react";
import MoviesData from "../../context/movieContext/MoviesData";
import Button from "react-bootstrap/Button";
import "./style/MoviesStyle.css";
const MoviesForm = ({ returnToGrid, data }) => {
  const { dispatch } = useContext(MoviesData);
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
    <div className="movieUpdateInput">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Title"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Button onClick={() => onSave()}>Save</Button>
    </div>
  );
};
export default MoviesForm;
