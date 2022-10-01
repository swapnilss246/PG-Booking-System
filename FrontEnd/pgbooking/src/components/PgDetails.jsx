import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import React from 'react'

import BookRoomInPg from "./BookRoomInPg";

function PgDetails() {
    const params = useParams();
    console.log("received PgId : " + params.id);

    const history = useHistory();

    const [pg, setPg] = useState({
        pgId: params.id,
        name: "",
        city: "",
        locality: "",
        amenities: "",
        pgDescription: "",
        foodAvailability: "",
        type:"",
        singleSharingPrice: "",
        doubleSharingPrice: "",
        tripleSharingPrice: "",
        image: ""
    });

    const checkRoleGenderAndBook = () => {
        if (sessionStorage.getItem("email") === null) {
            alert("Please Login First!");
            history.push("/clogin");
        }
        else if (sessionStorage.getItem("role") !== "customer") {
            alert("Please Login With Customer Account!");
            history.push("/clogin");
        }
        else if (sessionStorage.getItem("gender") === "FEMALE" && pg.type === "GENTS") {
            alert("This is Gents PG!!! You are not allowed to book this PG!!!");
            history.push("/");
        }
        else if (sessionStorage.getItem("gender") === "MALE" && pg.type === "LADIES") {
            alert("This is Ladies PG!!! You are not allowed to book this PG!!!");
            history.push("/");
        }
        else {
            sessionStorage.setItem("pgId", params.id);
            sessionStorage.setItem("pgName", pg.name);
            sessionStorage.setItem("pgSinglePrice", pg.singleSharingPrice);
            sessionStorage.setItem("pgDoublePRice", pg.doubleSharingPrice);
            sessionStorage.setItem("pgTriplePrice", pg.tripleSharingPrice);
            sessionStorage.setItem("type", pg.type);
            history.push("/booknewroom")
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/paying_guest_houses/details/" + params.id).then((resp) => {
            console.log(resp.data);
            setPg(resp.data);
        });
    }, []);

    return (
        <div>
            <div className="container-fluid text-white">
                <h4 className="p-2 text-center">Paying Guest House Details</h4>
                <table className="table table-bordered table-striped table-light table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>PG Name</th>
                            <th>City</th>
                            <th>Locality</th>
                            <th>Amenities</th>
                            <th>PG Description</th>
                            <th>Is Food Available</th>
                            <th>Type</th>
                            <th>Image</th>
                            <th>Price(per Month)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={pg.pgId}>
                            <td>{pg.name}</td>
                            <td>{pg.city}</td>
                            <td>{pg.locality}</td>
                            <td>{pg.amenities}</td>
                            <td>{pg.pgDescription}</td>
                            <td>{pg.foodAvailability}</td>
                            <td>{pg.type}</td>
                            <td><img src={`http://localhost:8080/paying_guest_houses/${pg.id}/image`}></img></td>
                            <td>
                                <div>
                                    Single Sharing : ₹{pg.singleSharingPrice} &nbsp;&nbsp;&nbsp;
                                </div>
                                <hr />
                                <div>
                                    Double Sharing : ₹{pg.doubleSharingPrice} &nbsp;&nbsp;&nbsp;
                                </div>
                                <hr />
                                <div>
                                    Triple Sharing : ₹{pg.tripleSharingPrice} &nbsp;&nbsp;&nbsp;
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={checkRoleGenderAndBook}> Book Now</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PgDetails;