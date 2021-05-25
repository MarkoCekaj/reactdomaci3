import React, {
  useState,

  useEffect,
} from "react";

import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import { useForm } from 'react-hook-form'
import "./style/MoviesStyle.css";
import { addMovie, editMovie, getMovie } from "../../services/movies";
import Alert from 'react-bootstrap/Alert'
const initialData = {
  id: 0,
  directorName: "",
  duration: 0,
  name: "",
  rating: 0,
  writerName: "",
};
const MovieEdit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
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
            {...register("directorName", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.directorName?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Duration"
            {...register("duration", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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

          {errors?.duration?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            {...register("name", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.name?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter rating"
            {...register("rating", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.rating?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Writer Name</Form.Label>
          <Form.Control
            type="text"
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
          {errors?.writerName?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default MovieEdit;
