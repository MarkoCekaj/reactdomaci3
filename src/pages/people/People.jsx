import React, { useState, useEffect } from "react";
// import PeopleForm from "./PeopleForm";
// import PeopleGrid from "./PeopleGrid";
// import peopleList from "../../context/peopleContext/peopleList";
// import PeopleData from "../../context/peopleContext/PeopleData";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import TableContent from "../../components/table/Table";
import { deletePerson, getAllPeople } from "../../services/people";
import Modal from "react-bootstrap/Modal";
import Pagination from "../../components/pagination/Pagination";

// const changePeople = (state, action) => {
//   switch (action.type) {
//     case "add":
//       const newId = peopleList.length;
//       return [
//         ...peopleList,
//         {
//           id: newId,
//           name: action.data.name,
//           surname: action.data.surname,
//           age: action.data.age,
//         },
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
  "id",
  "First Name",
  "Last Name",
  "Birth Date",
  "age",
  "gender",
  "occupation",
  "Edit",
  "Delete",
];

const People = () => {
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const history = useHistory();
  const [modalData, setModalData] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  //paginate

  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [personPerPage] = useState(10);
  useEffect(() => {
    const fetchPeople = async () => {
      const res = await getAllPeople();
      setPeople(res.data);
    };
    fetchPeople();
  }, []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPerson = currentPage * personPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personPerPage;
  const currentPosts = rows.slice(indexOfFirstPerson, indexOfLastPerson);
  const onDelete = () => {
    if (modalData?.id) {
      deletePerson(modalData?.id)
        .then((e) => {
          setModalOpen(true);
          setRefresh((prevState) => prevState + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const [isGridInView, setIsGridInView] = useState(true);
  // const [personList, dispatch] = useReducer(changePeople, peopleList);
  // const [selectedRow, setSelectedRow] = useState({});
  // const onRowClick = (e) => {
  //   setSelectedRow(e);
  //   setIsGridInView(false);
  useEffect(() => {
    getAllPeople()
      .then((e) => {
        console.log(e);
        const data = e?.data.map((item) => {
          return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            dateOfBirth: item.dateOfBirth,
            age: item.age,
            gender: item.gender,
            occupation: item.occupation,
            edit: (
              <Button onClick={() => history.push(`/people/${item.id}`)}>
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
          Are you sure you want to delete {modalData?.firstName}{" "}
          {modalData?.lastName} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => onDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Button className="mb-3" onClick={() => history.push("/people/add")}>
        Add
      </Button>
      <TableContent headers={headers} rows={(rows, currentPosts)} />
      <Pagination
        postsPerPage={personPerPage}
        totalPosts={people.length}
        paginate={paginate}
      />
    </div>
  );
};
export default People;
