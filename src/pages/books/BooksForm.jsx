import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./style/BooksStyle.css";
import { useHistory, useParams } from "react-router";
import { addBook, editBook, getBooks } from "../../services/books";
import { useForm } from 'react-hook-form'
import Form from "react-bootstrap/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const initialData = {
  id: 0,
  isbn: "",
  writerName: "",
  publisherName: "",
  publishedDate: "",
  genre: "",
};
const BookEdit = () => {
  const validationSchema = Yup.object().shape({
    isbn: Yup.string().required("Isbn is required"),
    writerName: Yup.string().required("Writer Name is required"),
    publisherName: Yup.string().required("Publisher Name is required"),
    publishedDate: Yup.string().required("Published date is required").matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Published date must be a valid date in the format YYYY-MM-DD'),
    genre: Yup.string().required("Genre name is required")
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState
  const { id } = useParams();
  const [formData, setFormData] = useState(initialData);
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
            className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
            placeholder="Enter ISBN"
            {...register('isbn')}
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
          <div className="invalid-feedback">{errors.isbn?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
            name="writerName"
            className={`form-control ${errors.writerName ? 'is-invalid' : ''}`}
            placeholder="Enter Writer Name"
            {...register('writerName')}
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
          <div className="invalid-feedback">{errors.writerName?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Publisher Name</Form.Label>
          <Form.Control
            type="text"
            name="publisherName"
            className={`form-control ${errors.publisherName ? 'is-invalid' : ''}`}
            placeholder="Enter Publisher name"
            {...register('publisherName')}
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
          <div className="invalid-feedback">{errors.publisherName?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            type="date"
            name="publishedDate"
            className={`form-control ${errors.publishedDate ? 'is-invalid' : ''}`}
            placeholder="Enter Published date"
            {...register('publishedDate')}
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
          <div className="invalid-feedback">{errors.publishedDate?.message}</div>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Genre"
            className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
            name="genre"
            {...register('genre')}
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
          <div className="invalid-feedback">{errors.genre?.message}</div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default BookEdit;
