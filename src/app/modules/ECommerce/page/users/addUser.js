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

function AddUser({ closeAddUser }) { 
  const [userdata, setUserData] = useState({
    "firstName": "",
    "lastName": "",
    "contact": "",
    "image": "",
    "email": "",
    "password": "",
    "cpassword": ""
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

  const addUser = () => {
    axios.post("http://localhost:3001/api/auth/register", userdata)
      .then(response => {
        if (response.data.success) {
          addSuccess();
          closeAddUser();
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
    toast.success("User Added Successfully", {
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
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div style={{ display: "block" ,width:"90%" }}>
        <div style={{ overflowY: "initial" }}>
          <div
            className="ml-3"
            style={{
              // marginTop: "20px",
              // overflowY: "auto",
              // overflowX: "hidden",
              // height: "80vh",
              // width:"80%"
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
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col xl="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstName"
                          >
                            First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-firstName"
                            placeholder="firstName"
                            name="firstName"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-lastName"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-lastName"
                            placeholder="lastName"
                            name="lastName"
                            type="text"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col xl="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-contact"
                          >
                            Contact Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-contact"
                            name="contact"
                            placeholder="0000000000"
                            type="number"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-image"
                          >
                            Image
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-image"
                            name="image"
                            placeholder=".jpg"
                            type="image"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            placeholder="example@example.com"
                            type="email"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Password Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="password"
                            name="password"
                            type="password"
                            onChange={changeHandler}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-emergencyContact"
                          >
                            Confirm Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-confirmPassword"
                            placeholder="confirmPassword"
                            type="password"
                            name="cpassword"
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
                      onClick={addUser}
                    >
                      Add
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={closeAddUser}
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
export default AddUser;
