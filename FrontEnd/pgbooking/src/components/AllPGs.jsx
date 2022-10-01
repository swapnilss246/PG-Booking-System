// import axios from "axios";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


function AllPayingGuestHouses(props) {

    return (
        <div className="container-fluid text-white">
            <h4 className="p-2 text-center">All Available Paying Guest Houses</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>PG Name</th>
                        <th>City</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {props.pgs.map((p) => (
                        <tr key={p.id}>
                            <td><Link to={`/getpgdetails/${p.id}`} >{p.name}</Link></td>
                            <td>{p.city}</td>
                            <td>
                                <Link to={`/getpgdetails/${p.id}`} >
                                    <img src={`http://localhost:8080/paying_guest_houses/${p.id}/image`}>
                                    </img>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllPayingGuestHouses;
