import React, {
  useState,

  useEffect,
} from "react";

import Button from "react-bootstrap/Button";
import "./style/PeopleStyle.css";
import { useHistory, useParams } from "react-router";
import { createPerson, updatePerson, getPerson } from "../../services/people";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useForm } from 'react-hook-form'
import Alert from 'react-bootstrap/Alert'

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
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
            {...register("age", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
          {errors?.age?.message ? <Alert variant="danger">Required field</Alert> : null}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter birth date"
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Required field !"
                }
              })}
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
          {errors?.dateOfBirth?.message ? <Alert variant="danger">Required field</Alert> : null}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Required field !"
                }
              })}
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
            {errors?.firstName?.message ? <Alert variant="danger">Required field</Alert> : null}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              {...register("gender", {
                required: {
                  value: true,
                  message: "Required field !"
                }
              })}
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
          </Form.Group>
          {errors?.gender?.message ? <Alert variant="danger">Required field</Alert> : null}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Required field !"
                }
              })}
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
          </Form.Group>
          {errors?.lastName?.message ? <Alert variant="danger">Required field</Alert> : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
            {...register("occupation", {
              required: {
                value: true,
                message: "Required field !"
              }
            })}
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
        </Form.Group>
        {errors?.occupation?.message ? <Alert variant="danger">Required field</Alert> : null}
        <Button variant="primary" type="submit" >
          Add
        </Button>
      </Form>
    </div>
  );
};
export default PeopleEdit;
