import React, { useState, useEffect } from "react";
// import BooksData from "../../context/booksContext/BooksData";
import Button from "react-bootstrap/Button";
import "./style/BooksStyle.css";
import { useHistory, useParams } from "react-router";
import { addBook, editBook, getBooks } from "../../services/books";
import { useForm } from 'react-hook-form'
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'
const initialData = {
  id: 0,
  isbn: "",
  writerName: "",
  publisherName: "",
  publishedDate: "",
  genre: "",
};
const BookEdit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const onSubmit = () => {

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
  const onError = (errors) => {
    console.log(errors)
  }
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

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            placeholder="Enter ISBN"
            {...register("isbn", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.isbn?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
            name="writerName"
            placeholder="Enter Writer Name"
            {...register("writerName", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
        {errors?.writerName?.message ? <Alert variant="danger">Required field</Alert> : null}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Publisher Name</Form.Label>
          <Form.Control
            type="text"
            name="publisherName"
            placeholder="Enter Publisher name"
            {...register("publisherName", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.publisherName?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            type="date"
            name="publishedDate"
            placeholder="Enter Published date"
            {...register("publishedDate", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
        {errors?.publishedDate?.message ? <Alert variant="danger">Required field</Alert> : null}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Genre"
            name="genre"
            {...register("genre", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
        {errors?.genre?.message ? <Alert variant="danger">Required field</Alert> : null}
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default BookEdit;
