import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ManageAllPgs() {
    const history = useHistory();
    const [pgs, setPgs] = useState([]);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        if (sessionStorage.getItem("role") !== "admin") {
            alert("Please Login!");
            history.push("/alogin");
        }

        console.log("Getting all PGs");
        axios
            .get("http://localhost:8080/paying_guest_houses/getall")
            .then((resp) => {
                console.log("After req processed....");
                console.log(resp.data);
                setPgs(resp.data);
                console.log(pgs);
            });

    }, [refresh]);

    const deletePg = (pgId) => {

        axios.delete("http://localhost:8080/paying_guest_houses/" + pgId)
            .then((resp) => {
                console.log(resp.data);
                setRefresh(refresh + 1);
                // alert(resp.data);
                history.push("/manageallpgs");
            });
    };

    // const editPgDetails = (pgId) => {

    //     axios.delete("http://localhost:8080/paying_guest_houses/" + pgId)
    //         .then((resp) => {
    //             console.log(resp.data);
    //             setRefresh(refresh+1);
    //             // alert(resp.data);
    //             history.push("/manageallpgs");
    //         });
    // };

    return (
        <div className="container-fluid text-white">
            <h4 className="p-2 text-center">Manage PGs</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>PG ID</th>
                        <th>PG Name</th>
                        <th>City</th>
                        <th>Locality</th>
                        <th>Amenities</th>
                        <th>PG Description</th>
                        <th>Is Food Available</th>
                        <th>Type</th>
                        <th>Image</th>
                        <th colSpan={"2"}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pgs.map((p) => (
                        <tr key={p.id}>

                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.city}</td>
                            <td>{p.locality}</td>
                            <td>{p.amenities}</td>
                            <td>{p.pgDescription}</td>
                            <td>{p.foodAvailability}</td>
                            <td>{p.type}</td>
                            <td><img src={`http://localhost:8080/paying_guest_houses/${p.id}/image`}></img></td>
                            <td>
                                <Link to={`/editpgdetails/${p.id}`} >
                                    {/* <button className="btn btn-info btn-sm">Edit PG Details</button> */}
                                    <EditIcon fontSize="large" color="action"></EditIcon>
                                </Link>
                            </td>
                            <td>
                                {/* <button
                                    onClick={(e) => deletePg(p.id)}
                                    className="btn btn-danger btn-sm">Delete PG
                                </button> */}
                                <button style={{ border: 'none' }} onClick={(e) => deletePg(p.id)}>
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

export default ManageAllPgs;
