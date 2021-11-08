import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddBooking({ closeAddBooking }) { 
  const [bookingdata, setBookingData] = useState({
    "sender": "",
    "receiver": "",
    "vehicle_id": ""
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/vehicle")
      .then(response => {
        setVehicles(response.data.vehicles);
      })
      .catch(err => {
      });
  }, []);

  const addBooking = () => {
    axios.post("http://localhost:3001/api/auth/register", bookingdata)
      .then(response => {
        if (response.data.success) {
          addSuccess();
          closeAddBooking();
        }
        else {
          addFailed();
        }

      })
      .catch(err => {
        addFailed();
      });
  };

  const addSuccess = () => {
    toast.success("Booking Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addFailed = () => {
    toast.error("Failed to Add", {
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

  return (
    <>
      <div style={{ display: "block" ,width:"90%"}}>
        <div style={{ overflowY: "initial"}}>
          <div
            className="ml-3"
            style={{
              marginTop: "20px",
              overflowY: "auto",
              overflowX: "hidden",
              width:"98%"
            }}
          >
            <Row>
              <Col col-lg="12">
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                  Booking information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullName"
                          >
                            Sender
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-fullName"
                            placeholder="fullName"
                            name="fullname"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullName"
                          >
                            Receiver
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-fullName"
                            placeholder="fullName"
                            name="fullname"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Vehicle_Id
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            placeholder="admin@example.com"
                            type="email"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="btn btn-success"
                      // onClick={setModalIsOpenToFalse}
                      style={{ margin: "10px" }}
                      onClick={addBooking}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddBooking}
                      style={{ margin: "10px" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddBooking;
