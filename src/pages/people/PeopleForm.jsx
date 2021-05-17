import React, {
  useState,
  // useContext
  useEffect,
} from "react";
// import PeopleData from "../../context/peopleContext/PeopleData";
import Button from "react-bootstrap/Button";
import "./style/PeopleStyle.css";
import { useHistory, useParams } from "react-router";
import { createPerson, updatePerson, getPerson } from "../../services/people";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
// const PeopleForm = ({ returnToGrid, data }) => {
//   const { dispatch } = useContext(PeopleData);
//   const [name, setName] = useState(data?.name ? data?.name : "");
//   const [surname, setSurname] = useState(data?.surname ? data?.surname : "");
//   const [age, setAge] = useState(data?.age ? data?.age : 1990);
//   const onSave = () => {
//     if (data?.id) {
//       dispatch({
//         type: "edit",
//         data: { id: data?.id, name: name, surname: surname, age: age },
//       });
//     } else {
//       dispatch({
//         type: "add",
//         data: { name: name, surname: surname, age: age },
//       });
//     }
//     returnToGrid();
//   };
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
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
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
      {/* <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="number"
        placeholder="Title"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Button onClick={() => onSave()}>Save</Button> */}
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
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
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter birth date"
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
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
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
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
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
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
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
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter occupation"
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

        <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
          Add
        </Button>
      </Form>
    </div>
  );
};
export default PeopleEdit;
