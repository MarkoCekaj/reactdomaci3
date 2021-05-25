import React, { useState, useEffect } from "react";
// import BooksForm from "./BooksForm";
// import BooksGrid from "./BooksGrid";
// import booksList from "../../context/booksContext/booksList";
// import BooksData from "../../context/booksContext/BooksData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router";
import { deleteBook, getAllBooks } from "../../services/books";
import TableContent from "../../components/table/Table";
import Pagination from "../../components/pagination/Pagination";

// const changeBooks = (state, action) => {
//   switch (action.type) {
//     case "add":
//       const newId = booksList.length;
//       return [
//         ...booksList,
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
const headers = [
  "ID",
  "ISBN",
  "Writer Name",
  "Publisher Name",
  "Published Date",
  "Genre",
  "Edit",
  "Delete",
];
const Books = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  //paginate
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getAllBooks();
      setBooks(res.data);
    };
    fetchBooks();
  }, []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentPosts = rows.slice(indexOfFirstBook, indexOfLastBook);
  const onDelete = () => {
    if (modalData?.id) {
      deleteBook(modalData?.id)
        .then((e) => {
          setModalOpen(false);
          setRefresh((prevState) => prevState + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getAllBooks()
      .then((e) => {
        console.log(e?.data);
        const data = e?.data.map((item) => {
          return {
            id: item.id,
            isbn: item.isbn,
            writerName: item.writerName,
            publisherName: item.publisherName,
            publishedDate: item.publishedDate,
            genre: item.genre,
            edit: (
              <Button onClick={() => history.push(`/books/${item.id}`)}>
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


  return (

    <div>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {modalData?.isbn}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Give up
          </Button>
          <Button variant="danger" onClick={() => onDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="mb-3" onClick={() => history.push("/books/add")}>
        Add
      </Button>
      <TableContent headers={headers} rows={(rows, currentPosts)} />
      <Pagination
        postsPerPage={booksPerPage}
        totalPosts={books.length}
        paginate={paginate}
      />
    </div>
  );
};
export default Books;
