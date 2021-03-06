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
// import add Decoration
import AddDecoration from "./addDecoration";
// core components
import axios from "axios";
import UpdateDecoration from "./UpdateDecoration.js";

export function DecorationPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decorations, retrieveDecoration] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [decorationId, setSelectDecoration] = useState("");
  const [decorationdata, setDecorationData] = useState("");

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
    setDecorationData({
      ...decorationdata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveDecoration(response.data.decoration);
      })
      .catch(err => {
        toastForFail("Cannot retrieve Decoration");
      });
  }, []);

  const deleteDecoration = () => {
    axios.delete("http://localhost:3001/api/auth/" + decorationId)
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

  var _rows = decorations.map(decoration => {
    var title = decoration.title;
    var image = decoration.image;
    var price = decoration.price;
    var make = decoration.make;
    var model = decoration.model;
    var contacts = decoration.contacts;
    var location = decoration.location;
    var date = moment(decoration.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectDecoration(decoration._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectDecoration(decoration._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'title': title,
      'image': image,
      'price': price,
      'make': make,
      "model": model,
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
        label: "Image",
        field: "image",
        //width: 100,
      },
      {
        label: "Price",
        field: "price",
        //width: 200,
      },
      {
        label: "Make",
        field: "make",
        //width: 250,
      },
      {
        label: "Model",
        field: "model",
        sort: "disabled",
        //width: 200,
      },
      {
        label: "Contacts",
        field: "contacts",
        //width: 200,
      },
      {
        label: "Location",
        field: "location",
        //width: 200,
      },
      {
        label: "Issued date",
        field: "date",
        //width: 150,
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
                    <strong>Decoration Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Decoration
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add Decoration Model */}

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
            {/* Modal for add Decoration */}
            <div className="AddDecoration">
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
                    <h1 className="text-center">Add Decoration</h1>
                  </div>
                </Modal.Header>
                 <AddDecoration closeAddDecoration={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update Decoration */}
            <div className="updateDecoration">
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
                    <h1 className="text-center">Update Decoration</h1>
                  </div>
                </Modal.Header>
                <UpdateDecoration closeUpdateDecorationModal={setUpdateModalClose} id={decorationId} />
              </Modal>
            </div>

            {/* Delete Decoration Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this Decoration?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteDecoration();
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

