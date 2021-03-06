import React, {useState, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
} from "reactstrap";
// import add event
import AddEvent from "./addEvent";
// core components
import axios from "axios";
import UpdateEvent from "./UpdateEvent.js";

export function EventPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, retrieveEvent] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [eventId, setSelectEvent] = useState("");
  const [eventdata, setEventData] = useState("");

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const setDeleteModalClose = () => {
    setDeleteModal(false);
  };
  const setDeleteModalOpen = () => {
    setDeleteModal(true);
  };

  const setUpdateModalClose = () => {
    setUpdateModal(false);
  };
  const setUpdateModalOpen = () => {
    setUpdateModal(true);
  };

  const toastForSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastForFail = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const changeHandler = (e) => {
    setEventData({
      ...eventdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveEvent(response.data.evnet);
      })
      .catch(err => {
        toastForFail("Cannot retrieve event");
      });
  }, []);

  const deleteEvent = () => {
    axios.delete("http://localhost:3001/api/auth/" + eventId)
      .then(
        (response) => {
          toastForSuccess("Delete Successfull");
          setDeleteModalClose();
        }
      )
      .catch(() => {
        toastForFail("Delete Unsuccessfull");
      });
  };

  var _rows = events.map(event => {
    var title = event.title;
    var eventdate = event.eventdate;
    var description = event.description;
    var image = event.image;
    var contacts = event.contacts;
    var location = event.location;
    var date = moment(event.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectEvent(event._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectEvent(event._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'title ': title,
      'eventdate': eventdate,
      'description': description,
      'image': image,
      "contacts": contacts,
      "location": location,
      "date": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Title",
        field: "title",
        //width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Title",
        },
      },
      {
        label: "Event Date",
        field: "eventdate",
        //width: 100,
      },
      {
        label: "Description",
        field: "description",
       // width: 200,
      },
      {
        label: "Image",
        field: "image",
       // width: 250,
      },
      {
        label: "Contact",
        field: "contact",
        sort: "disabled",
       // width: 200,
      },
      {
        label: "Location",
        field: "location",
        //width: 200,
      },
      {
        label: "Issued date",
        field: "date",
       // width: 150,
      },
      {
        label: "Action",
        field: "action",
        //width: 150,
      },
    ],
    rows: _rows
  };

  return (
    <>
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <h3 className="mb-0 col-lg-6">
                    <strong>Event Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Event Model */}

              <div style={{ padding: "20px" }}>
                <MDBDataTableV5
                  className="detailsTable"
                  hover
                  scrollX
                  entriesOptions={[5, 10, 15]}
                  entries={5}
                  pagesAmount={4}
                  data={dataTable}
                  searchTop
                />
              </div>
            </Card>
            {/* Modal for add Event */}
            <div className="AddEvent">
              <Modal
                show={modalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setModalIsOpenToFalse}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Add Event</h1>
                  </div>
                </Modal.Header>
                 <AddEvent closeAddEvent={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Event */}
            <div className="updateEvent">
              <Modal
                show={updateModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setUpdateModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Update Event</h1>
                  </div>
                </Modal.Header>
                <UpdateEvent closeUpdateEventModal={setUpdateModalClose} id={eventId} />
              </Modal>
            </div>

            {/* Delete Event Modal */}
            <div className="deleteVehicle">
              <Modal
                show={deleteModalIsOpen}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={setDeleteModalClose}
                style={{
                  overlay: {
                    justifyContent: "center",
                    display: "flex",
                  }
                }}
              >
                <Modal.Header closeButton >
                  <div className="w-100">
                    <h1 className="text-center">Delete</h1>
                  </div>
                </Modal.Header>
                <Modal.Body ><strong>Are you sure you want to delete this event?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteEvent();
                    }} >
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={setDeleteModalClose}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

