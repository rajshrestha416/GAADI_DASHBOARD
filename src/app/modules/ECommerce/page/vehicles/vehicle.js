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
// import add vehicle
import AddVehicle from "./addVehicle";
// core components
import axios from "axios";
import UpdateVehicle from "./UpdateVehicle.js";

export function VehiclePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vehicles, retrieveVehicle] = useState([]);
  const [deleteModalIsOpen, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [vehicleId, setSelectVehicle] = useState("");
  const [vehicledata, setVehicleData] = useState("");

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
    setVehicleData({
      ...vehicledata,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/all')
      .then(response => {
        retrieveVehicle(response.data.vehicle);
      })
      .catch(err => {
        toastForFail("Cannot retrieve vehicle");
      });
  }, []);

  const deleteVehicle = () => {
    axios.delete("http://localhost:3001/api/auth/" + vehicleId)
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

  var _rows = vehicles.map(vehicle => {
    // Make Model price color 
    var title = vehicle.title;
    var image = vehicle.image;
    var make = vehicle.make;
    var model = vehicle.model;
    var price = vehicle.price;
    var color = vehicle.color;
    var features = vehicle.features;
    var contacts = vehicle.contacts;
    var location = vehicle.location;
    var date = moment(vehicle.createdAt).format('DD/MM/YYYY');
    var createdAt = date;
    var action = <div className="justify-content-start text-start">
        <button className="action btn btn-primary fas fa-solid fa-book"
          onClick={() => {
            setSelectVehicle(vehicle._id);
            setUpdateModalOpen();
          }} ></button>
        <button className="action btn btn-danger fa fa-solid fa-trash"
          onClick={
            () => {
              setSelectVehicle(vehicle._id);
              setDeleteModalOpen();
            }}></button>
      </div>;

    return {
      'make': make,
      'model': model,
      'price': price,
      'color': color,
      'title': title,
      'features': features,
      'contacts': contacts,
      'location': location,
      'color': color,
      "date": createdAt,
      "action": action
    };
  });

  const dataTable = {
    columns: [
      {
        label: "Make",
        field: "make",
        //width: 200,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Make",
        },
      },
      {
        label: "Model",
        field: "model",
        //width: 100,
      },
      {
        label: "Price",
        field: "price",
       // width: 200,
      },
      {
        label: "Location",
        field: "location",
       // width: 250,
      },
      {
        label: "Color",
        field: "color",
       // width: 250,
      },
      {
        label: "Title",
        field: "title",
       // width: 250,
      },
      {
        label: "Features",
        field: "features",
       // width: 250,
      },
      {
        label: "Contacts",
        field: "contacts",
        //width: 250,
      },
      {
        label: "Date",
        field: "date",
        sort: "disabled",
       // width: 200,
      },
      {
        label: "Issued date",
        field: "date",
        //width: 150,
      },
      {
        label: "Action",
        field: "action",
       // width: 150,
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
                    <strong>Vehicle Details</strong>
                  </h3>
                  <div className="col-lg-6 d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary p-2"
                      type="button"
                      onClick={setModalIsOpenToTrue}
                    >
                      Add Vehicle
                    </button>
                  </div>
                </div>
              </CardHeader>

              {/* Add vehicle Model */}

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
            {/* Modal for add vehicle */}
            <div className="AddVehicle">
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
                    <h1 className="text-center">Add Vehicle</h1>
                  </div>
                </Modal.Header>
                 <AddVehicle closeAddVehicle={setModalIsOpenToFalse} />
              </Modal>
            </div>

            {/* Modal for Update vehicle */}
            <div className="updateVehicle">
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
                    <h1 className="text-center">Update Vehicle</h1>
                  </div>
                </Modal.Header>
                <UpdateVehicle closeUpdateVehicleModal={setUpdateModalClose} id={vehicleId} />
              </Modal>
            </div>

            {/* Delete vehicle Modal */}
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
                <Modal.Body ><strong>Are you sure you want to delete this vehicle?</strong></Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-danger" onClick={
                    () => {
                      deleteVehicle();
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

