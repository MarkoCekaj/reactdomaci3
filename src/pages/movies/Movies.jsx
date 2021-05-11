import React, { useState, useReducer } from "react";
import MoviesForm from "./MoviesForm";
import MoviesGrid from "./MoviesGrid";
import moviesList from "../../context/movieContext/moviesList";
import MoviesData from "../../context/movieContext/MoviesData";
import Button from "react-bootstrap/Button";

const changeMovies = (state, action) => {
  switch (action.type) {
    case "add":
      const newId = moviesList.length;
      return [
        ...moviesList,
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
const Movies = () => {
  const [isGridInView, setIsGridInView] = useState(true);
  const [movieList, dispatch] = useReducer(changeMovies, moviesList);
  const [selectedRow, setSelectedRow] = useState({});
  const onRowClick = (e) => {
    setSelectedRow(e);
    setIsGridInView(false);
  };

  return (
    <MoviesData.Provider
      value={{ list: movieList, dispatch: (e) => dispatch(e) }}
    >
      <div>
        <div className="moviesUpdateButtons">
          <div>
            <Button onClick={() => setIsGridInView(true)}>Show Movies</Button>
          </div>
          <div>
            <Button onClick={() => setIsGridInView(false)}>Add movie</Button>
          </div>
          <div onClick={() => setIsGridInView(false)}>
            <Button>Update movie</Button>
          </div>
        </div>

        <div>
          {isGridInView ? (
            <MoviesGrid onRowClick={onRowClick} />
          ) : (
            <MoviesForm
              returnToGrid={() => {
                setIsGridInView(true);
                setSelectedRow({});
              }}
              data={selectedRow}
            />
          )}
        </div>
      </div>
    </MoviesData.Provider>
  );
};
export default Movies;
