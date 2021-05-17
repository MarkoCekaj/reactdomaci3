import React, { useState, useEffect } from "react";
// import BooksData from "../../context/booksContext/BooksData";
import Button from "react-bootstrap/Button";
import "./style/BooksStyle.css";
import { useHistory, useParams } from "react-router";
import { addBook, editBook, getBooks } from "../../services/books";
import Form from "react-bootstrap/Form";
// const Form = ({ returnToGrid, data }) => {
//   const { dispatch } = useContext(BooksData);
//   const [title, setTitle] = useState(data?.title ? data?.title : "");
//   const [year, setYear] = useState(data?.year ? data?.year : 2010);
//   const onSave = () => {
//     if (data?.id) {
//       dispatch({
//         type: "edit",
//         data: { id: data?.id, name: title, year: year },
//       });
//     } else {
//       dispatch({ type: "add", data: { name: title, year: year } });
//     }
//     returnToGrid();
//   };
const initialData = {
  id: 0,
  isbn: "",
  writerName: "",
  publisherName: "",
  publishedDate: "",
  genre: "",
};
const BookEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (id !== "add") {
      editBook(formData)
        .then((r) => {
          history.push("/books");
        })
        .catch((r) => {
          console.log(r?.response?.data);
        });
    } else {
      delete formData.id;
      addBook(formData)
        .then((r) => {
          history.push("/books");
        })
        .catch((r) => {
          console.log(r?.response?.data);
        });
    }
  };

  useEffect(() => {
    if (id !== "add") {
      getBooks(id).then((r) => {
        console.log(r?.data);
        setFormData(r.data);
      });
    }
  }, [id]);
  return (
    <div className="booksUpdateInput">
      {/* <input
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
      <Button onClick={() => onSave()}>Save</Button> */}
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            value={formData?.isbn}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  isbn: e.target.value,
                };
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Writer Name"
            value={formData?.writerName}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  writerName: e.target.value,
                };
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Publisher Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Publisher name"
            value={formData?.publisherName}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  publisherName: e.target.value,
                };
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Published date"
            value={formData?.publishedDate}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  publishedDate: e.target.value,
                };
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Genre"
            value={formData?.genre}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  genre: e.target.value,
                };
              })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
          Add
        </Button>
      </Form>
    </div>
  );
};
export default BookEdit;
