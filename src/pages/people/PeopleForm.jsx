import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./style/PeopleStyle.css";
import { useHistory, useParams } from "react-router";
import { createPerson, updatePerson, getPerson } from "../../services/people";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const initialData = {
  id: 0,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  age: 0,
  occuptaion: "",
  gender: "",
};
const PeopleEdit = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.string().required("Date of birth is required").matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of birth must be a valid date in the format YYYY-MM-DD'),
    age: Yup.number().required("Age is required"),
    occupation: Yup.string().required("Occupation is required"),
    gender: Yup.string().required("gender is required")
  })
  const formOptions = { resolver: yupResolver(validationSchema) }
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const { id } = useParams();
  const [formData, setFormData] = useState(initialData);
  const history = useHistory();
  const onSubmit = () => {

    if (id !== "add") {
      updatePerson(formData)
        .then((r) => {
          history.push("/people");
        })
        .catch((r) => {
          console.log(r?.response?.data);
        });
    } else {
      delete formData.id;
      createPerson(formData)
        .then((r) => {
          history.push("/people");
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
      getPerson(id).then((r) => {
        console.log(r?.data);
        setFormData(r.data);
      });
    }
  }, [id]);
  return (
    <div className="peopleUpdateInput">

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            {...register('age')}
            value={formData?.age}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  age: e.target.value,
                };
              })
            }
          />
          <div className="invalid-feedback">{errors.age?.message}</div>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter birth date"
              className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
              {...register('dateOfBirth')}
              value={formData?.dateOfBirth}
              onChange={(e) =>
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    dateOfBirth: e.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <div className="invalid-feedback">{errors.dateOfBirth?.message}</div>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              {...register('firstName')}
              value={formData?.firstName}
              onChange={(e) =>
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    firstName: e.target.value,
                  };
                })
              }
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
              {...register('gender')}
              value={formData?.gender}
              onChange={(e) =>
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    gender: e.target.value,
                  };
                })
              }
            >
              <option>MALE</option>
              <option>FEMALE</option>
            </Form.Control>
            <div className="invalid-feedback">{errors.gender?.message}</div>
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              {...register('lastName')}
              value={formData?.lastName}
              onChange={(e) =>
                setFormData((prevState) => {
                  return {
                    ...prevState,
                    lastName: e.target.value,
                  };
                })
              }
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </Form.Group>

        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            className={`form-control ${errors.occupation ? 'is-invalid' : ''}`}
            {...register('occupation')}
            value={formData?.occupation}
            onChange={(e) =>
              setFormData((prevState) => {
                return {
                  ...prevState,
                  occupation: e.target.value,
                };
              })
            }
          />
          <div className="invalid-feedback">{errors.occupation?.message}</div>
        </Form.Group>

        <Button variant="primary" type="submit" >
          Add
        </Button>
      </Form>
    </div>
  );
};
export default PeopleEdit;
