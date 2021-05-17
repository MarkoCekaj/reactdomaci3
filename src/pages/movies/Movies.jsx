import React, { useState, useEffect } from "react";
// import MoviesForm from "./MoviesForm";
// import MoviesGrid from "./MoviesGrid";
// import moviesList from "../../context/movieContext/moviesList";
// import MoviesData from "../../context/movieContext/MoviesData";
import { useHistory } from "react-router-dom";
import { getAllMovies, deleteMovie } from "./../../services/movies";
import Button from "react-bootstrap/Button";
import TableContent from "../../components/table/Table";
import Modal from "react-bootstrap/Modal";
import Pagination from "./../../components/pagination/Pagination";

const headers = [
  "ID",
  "Name",
  "Director Name",
  "Writer Name",
  "Rating",
  "Duration",
  "Edit",
  "Delete",
];
// const changeMovies = (state, action) => {
//   switch (action.type) {
//     case "add":
//       const newId = moviesList.length;
//       return [
//         ...moviesList,
//         { id: newId, name: action.data.name, year: action.data.year },
//       ];
//     case "edit":
//       return state.map((item) => {
//         if (item.id === action.data.id) {
//           return action.data;
//         }
//         return item;
//       });
//     default:
//       return;
//   }
// };
const Movies = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [modalData, setModalData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  //paginate
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getAllMovies();
      setMovies(res.data);
    };
    fetchMovies();
  }, []);
  const onDelete = () => {
    if (modalData?.id) {
      deleteMovie(modalData?.id)
        .then((e) => {
          setModalOpen(false);
          setRefresh((prevState) => prevState + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const currentPosts = rows.slice(indexOfFirstMovie, indexOfLastMovie);

  useEffect(() => {
    getAllMovies()
      .then((e) => {
        // console.log(e?.data);
        const data = e?.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            directorName: item.directorName,
            writerName: item.writerName,
            rating: item.rating,
            duration: item.duration,
            edit: (
              <Button onClick={() => history.push(`/movies/${item.id}`)}>
                Edit
              </Button>
            ),
            delete: (
              <Button
                variant="danger"
                onClick={() => {
                  setModalData(item);
                  setModalOpen(true);
                }}
              >
                Delete
              </Button>
            ),
          };
        });
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history, refresh]);
  // const [isGridInView, setIsGridInView] = useState(true);
  // const [movieList, dispatch] = useReducer(changeMovies, moviesList);
  // const [selectedRow, setSelectedRow] = useState({});
  // const onRowClick = (e) => {
  //   setSelectedRow(e);
  //   setIsGridInView(false);
  return (
    // <MoviesData.Provider
    //   value={{ list: movieList, dispatch: (e) => dispatch(e) }}
    // >
    //   <div>
    //     <div className="moviesUpdateButtons">
    //       <div>
    //         <Button onClick={() => setIsGridInView(true)}>Show Movies</Button>
    //       </div>
    //       <div>
    //         <Button onClick={() => setIsGridInView(false)}>Add movie</Button>
    //       </div>
    //       <div onClick={() => setIsGridInView(false)}>
    //         <Button>Update movie</Button>
    //       </div>
    //     </div>

    //     <div>
    //       {isGridInView ? (
    //         <MoviesGrid onRowClick={onRowClick} />
    //       ) : (
    //         <MoviesForm
    //           returnToGrid={() => {
    //             setIsGridInView(true);
    //             setSelectedRow({});
    //           }}
    //           data={selectedRow}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </MoviesData.Provider>
    <div>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {modalData?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => onDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="mb-3" onClick={() => history.push("/movies/add")}>
        Add
      </Button>
      <TableContent headers={headers} rows={(rows, currentPosts)} />

      <Pagination
        postsPerPage={moviesPerPage}
        totalPosts={movies.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Movies;
