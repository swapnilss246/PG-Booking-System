import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bookingValidation from '../bookingValidation';
import { Calculate } from '@mui/icons-material';

function BookRoomInPg() {
  console.log("In BookRoomInPg ");
  console.log("pgid: " + sessionStorage.getItem("pgId"));

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [bookingData, setBookingData] = useState({
    pgId: sessionStorage.getItem("pgId"),
    pgName: sessionStorage.getItem("pgName"),
    customerId: sessionStorage.getItem("id"),
    startDate: "",
    sharingType: "",
    endDate: "",
    amount: 0,
  });

  var singleSharingPrice = parseFloat(sessionStorage.getItem("pgSinglePrice"));
  var doubleSharingPrice = parseFloat(sessionStorage.getItem("pgDoublePRice"));
  var tripleSharingPrice = parseFloat(sessionStorage.getItem("pgTriplePrice"));
  var pgType = sessionStorage.getItem("type");


  const handleInput = (e) => {
    // e.preventDefault();

    setBookingData({ ...bookingData, [e.target.name]: e.target.value });

    console.log(bookingData)
    setCalculate(true)
    // setBookingData({ ...bookingData, [e.target.amount]: diffInMonth });
  };


  const calculateBill = () => {


    if (bookingData.sharingType !== "" && bookingData.startDate !== "" && bookingData.endDate !== "") {
      var start = new Date(bookingData.startDate);

      var end = new Date(bookingData.endDate);

      var diffInMs = Math.abs(end - start);

      var diffInMonth = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 30));

      if (bookingData.sharingType === "SINGLE") {
        console.log("singleSharingPrice : " + singleSharingPrice);
        setBookingData({ ...bookingData, amount: diffInMonth * singleSharingPrice });

      }
      if (bookingData.sharingType === "DOUBLE") {
        console.log("doubleSharingPrice::" + doubleSharingPrice)
        setBookingData({ ...bookingData, amount: diffInMonth * doubleSharingPrice });
      }


      if (bookingData.sharingType === "TRIPLE") {
        console.log("tripleSharingPrice::" + tripleSharingPrice)
        setBookingData({ ...bookingData, amount: diffInMonth * tripleSharingPrice });
      }
    }
    console.log("price now : " + bookingData.amount);

    setCalculate(false)
  }

  const [calculate, setCalculate] = useState(false);

  useEffect(() => {


    if (sessionStorage.getItem("email") === null) {
      alert("Please Login First!");
      history.push("/clogin");
    }
    else if (sessionStorage.getItem("role") !== "customer") {
      alert("Please Login With Customer Account!");
      history.push("/clogin");
    } 
    else if (sessionStorage.getItem("gender") === "FEMALE" && pgType === "GENTS") {
      alert("This is Gents PG!!! You are not allowed to book this PG!!!");
      history.push("/");
    }
    else if (sessionStorage.getItem("gender") === "MALE" && pgType === "LADIES") {
      alert("This is Ladies PG!!! You are not allowed to book this PG!!!");
      history.push("/");
    }
    else if(pgType === null){
      alert("Please select PG to book!!!");
      history.push("/");
    }

    if (calculate)
      calculateBill();
  }, [bookingData])

  useEffect(() => {
    // console.log("sharing type selected : " + bookingData.sharingType);
    // if (bookingData.sharingType === "") {
    //   errors.sharingType = "Please Select Sharing Type (use effect)";
    // }
    console.log(errors);
    console.log(Object.keys(errors).length);

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(bookingData);
      axios.post("http://localhost:8080/bookings/booknewroom", bookingData)
        .then((resp) => {
          console.log(resp);
          alert("Room Booked Successfully!!!");
          history.push("/mybookings");
        })
        .catch((error) => {
          alert("No occupancy available for requested sharing type in this PG!!!...")
          console.log("Error in booking room : " + error)
        });
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(bookingValidation(bookingData));
    if (!bookingData.sharingType) {
      errors.sharingType = "Please Select Sharing Type";
    }
    setSubmitted(true);
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-sm-4">
          <form onSubmit={handleSubmit}>
            <h5 className="p-2">Booking Details</h5>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">PG Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="pgName"
                  readOnly
                  value={bookingData.pgName}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Select Sharing Type</label>
              <div className="col-sm-8">
                <select
                  name="sharingType"
                  value={bookingData.sharingType}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option>SELECT </option>
                  <option value="SINGLE">SINGLE</option>
                  <option value="DOUBLE">DOUBLE</option>
                  <option value="TRIPLE">TRIPLE</option>
                </select>
                {errors.sharingType && (
                  <small className="text-danger float-right">
                    {errors.sharingType}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Start Date</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  name="startDate"
                  onChange={handleInput}
                  value={bookingData.startDate}
                  className="form-control"
                />
                {errors.startDate && (
                  <small className='text-danger float-right'>
                    {errors.startDate}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">End Date</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  name="endDate"
                  onChange={handleInput}
                  value={bookingData.endDate}
                  className="form-control"
                />
                {errors.endDate && (
                  <small className='text-danger float-right'>
                    {errors.endDate}
                  </small>
                )}
              </div>
            </div>
            <div className="form-group form-row">
              <label className="col-sm-4 form-control-label">Bill Amount(₹)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="amount"
                  readOnly
                  value={bookingData.amount}
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
            </div>
            <button className="btn btn-primary float-right">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookRoomInPg;