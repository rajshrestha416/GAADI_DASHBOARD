import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import axios from "axios";

function UpdateBooking({ closeUpdateBookingModal, id }) {

    // alert(id)

    const [bookingdata, setBookingData] = useState({
        "fullname": "",
        "age": "",
        "address": "",
        "email": "",
        "contact": "",
        "vehicle": "",
        "emContact": ""
    });

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/vehicle")
            .then(response => {
                setVehicles(response.data.vehicles);
            })
            .catch(err => {
            });
    }, [vehicles]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/" + id)
            .then(response => {
                if (response.data.success) {
                    setBookingData(response.data.booking);
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    }, [id]);

    const updateBooking = () => {
        axios.put("http://localhost:3001/api/auth/" + id, bookingdata)
            .then(response => {
                if (response.data.success) {
                    closeUpdateBookingModal();
                    UpdateSuccess();
                }
                else {
                    UpdateFailed();
                }
            })
            .catch(err => {
                UpdateFailed();
            });
    };

    const UpdateSuccess = () => {
        toast.success("Successfully updated booking", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const UpdateFailed = () => {
        toast.error("Failed to update booking", {
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
            <div style={{ display: "block" }}>
                <div style={{ overflowY: "initial" }}>
                    <div
                        className="pl-lg-4"
                        style={{
                            marginTop: "20px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "80vh",
                        }}
                    >
                        <Row>
                            <Col col-xl="12">
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                    Booking information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-sender"
                                                    >
                                                        Sender
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-sender"
                                                        placeholder="sender"
                                                        name="sender"
                                                        value={bookingdata.sender}
                                                        type="text"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-receiver"
                                                    >
                                                        Receiver
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-receiver"
                                                        name="receiver"
                                                        placeholder="receiver"
                                                        type="receiver"
                                                        value={bookingdata.receiver}
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-vehicle_id"
                                                    >
                                                        Vechile_Id
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-vehicle_id"
                                                        name="avehicle_idge"
                                                        value={bookingdata.vehicle_id}
                                                        placeholder="vehicle_id"
                                                        type="number"
                                                        onChange={changeHandler}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    
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
export default UpdateBooking;
