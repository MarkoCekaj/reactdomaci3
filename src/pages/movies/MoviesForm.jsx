import React, {
  useState,
  // useContext
  useEffect,
} from "react";
// import MoviesData from "../../context/movieContext/MoviesData";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import "./style/MoviesStyle.css";
import { addMovie, editMovie, getMovie } from "../../services/movies";
const initialData = {
  id: 0,
  directorName: "",
  duration: 0,
  name: "",
  rating: 0,
  writerName: "",
};
// const MoviesForm = ({ returnToGrid, data }) => {
//   const { dispatch } = useContext(MoviesData);
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
const MovieEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
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
      {/* <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Title"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Button onClick={() => onSave()}>Save</Button> */}
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Director"
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
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Duration"
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
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
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
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter rating"
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

        <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default MovieEdit;
