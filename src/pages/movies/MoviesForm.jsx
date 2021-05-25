import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import { useForm } from 'react-hook-form'
import "./style/MoviesStyle.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addMovie, editMovie, getMovie } from "../../services/movies";
const initialData = {
  id: 0,
  directorName: "",
  duration: "",
  name: "",
  rating: "",
  writerName: "",
};
const MovieEdit = () => {
  const validationSchema = Yup.object().shape({
    directorName: Yup.string().required("Director Name is required"),
    duration: Yup.number().required("Duration is required"),
    name: Yup.string().required("Name is required"),
    rating: Yup.number().required("rating is required"),
    writerName: Yup.string().required("Writer name is required")
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState
  const { id } = useParams();
  const [formData, setFormData] = useState(initialData);
  const history = useHistory();
  const onSubmit = () => {
    if (id !== "add") {
      editMovie(formData)
        .then((r) => {
          history.push("/movies");
        })
        .catch((r) => {
          console.log(r?.response?.data);
        });
    } else {
      delete formData.id;
      addMovie(formData).then((r) => {
        history.push("/movies");
      });
    }
  };
  const onError = (errors) => {
    console.log(errors)
  }
  useEffect(() => {
    if (id !== "add") {
      getMovie(id).then((r) => {
        console.log(r?.data);
        setFormData(r.data);
      });
    }
  }, [id]);
  return (
    <div className="movieUpdateInput">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Director"
            className={`form-control ${errors.directorName ? 'is-invalid' : ''}`}
            {...register('directorName')}
            value={formData?.directorName}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  directorName: e.target.value,
                };
              })
            }
          />
          <div className="invalid-feedback">{errors.directorName?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Duration"
            className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
            {...register('duration')}
            value={formData?.duration}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  duration: e.target.value,
                };
              })
            }
          />

          <div className="invalid-feedback">{errors.duration?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name')}
            value={formData?.name}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              })
            }

          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter rating"
            className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
            {...register('rating')}
            value={formData?.rating}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  rating: e.target.value,
                };
              })
            }
          />
          <div className="invalid-feedback">{errors.rating?.message}</div>
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Writer Name"
            className={`form-control ${errors.writerName ? 'is-invalid' : ''}`}
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
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default MovieEdit;
