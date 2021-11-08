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
// import add booking
import AddBooking from "./addBooking";
// core components
import axios from "axios";
import UpdateBooking from "./UpdateBooking.js";

export function BookingPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookings, retrieveBooking] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [bookingId, setSelectBooking] = useState("");
  const [bookingdata, setBookingData] = useState("");

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
    setBookingData({
      ...bookingdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveBooking(response.data.booking);
      })
      .catch(err => {
        toastForFail("Cannot retrieve Booking");
      });
  }, []);

  const deleteBooking = () => {
    axios.delete("http://localhost:3001/api/auth/" + bookingId)
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

  var _rows = bookings.map(booking => {
    var sender = booking.sender;
    var receiver = booking.receiver;
    var date = moment(booking.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectBooking(booking._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectBooking(booking._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'sender': sender,
      'receiver': receiver,
      "createdAt": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Sender",
        field: "sender",
        //width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "sender",
        },
      },
      {
        label: "Receiver",
        field: "receiver",
       // width: 100,
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
                    <strong>Booking Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Booking
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Booking Model */}

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
            {/* Modal for add Booking */}
            <div className="AddBooking">
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
                    <h1 className="text-center">Add Booking</h1>
                  </div>
                </Modal.Header>
                 <AddBooking closeAddBooking={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Booking */}
            <div className="updateBooking">
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
                    <h1 className="text-center">Update Booking</h1>
                  </div>
                </Modal.Header>
                <UpdateBooking closeUpdateBookingModal={setUpdateModalClose} id={bookingId} />
              </Modal>
            </div>

            {/* Delete Booking Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this Booking?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteBooking();
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

