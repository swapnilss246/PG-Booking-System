import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EditIcon from '@mui/icons-material/Edit';

function MyBookings() {

    const history = useHistory();

    const [bookings, setBookings] = useState([]);

    const [refresh, setRefresh] = useState(0);
    let bookingId;

    useEffect(() => {
        if (sessionStorage.getItem("role") !== "customer") {
            alert("Please Login!");
            history.push("/clogin");
        }

        console.log("Getting all Bookings");
        axios
            .get("http://localhost:8080/bookings/details/" + sessionStorage.getItem("id"))
            .then((resp) => {
                console.log("After req processed....");
                console.log(resp.data);
                setBookings(resp.data);
                console.log(bookings);
                bookingId = resp.data.id;
            });
    }, [refresh]);

    const cancelBooking = (bookingId) => {

        axios.delete("http://localhost:8080/bookings/" + bookingId)
            .then((resp) => {
                console.log(resp.data);
                setRefresh(refresh + 1);
                // alert(resp.data);
                history.push("/mybookings");
            });
    };


    return (
        <div className="container-fluid text-white">
            <h4 className="p-2 text-center">Booking History</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer ID</th>
                        <th>Email</th>
                        <th>Booking ID</th>
                        <th>PG ID</th>
                        <th>Room ID</th>
                        <th>Booking Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Amount Paid</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b) => (
                        <tr key={b.id}>

                            <td>{sessionStorage.getItem("uname")}</td>
                            <td>{sessionStorage.getItem("id")}</td>
                            <td>{sessionStorage.getItem("email")}</td>
                            <td>{b.id}</td>
                            <td>{b.pgId}</td>
                            <td>{b.roomId}</td>
                            <td>{b.bookingDate}</td>
                            <td>{b.startDate}</td>
                            <td>{b.endDate}</td>
                            <td>{b.amount}</td>
                            <td>
                                <Link to={`/getpgdetails/${b.pgId}`} >
                                    {/* <button className="btn btn-info btn-sm">Get PG Details</button> */}
                                    <InfoRoundedIcon fontSize="large" color="action"></InfoRoundedIcon>
                                </Link>
                            </td>
                            <td>
                                <button
                                    style={{ border: 'none' }}
                                    onClick={(e) => cancelBooking(b.id)} >
                                    <DeleteIcon fontSize="large"></DeleteIcon>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyBookings;
