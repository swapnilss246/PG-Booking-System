import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AllPayingGuestHousesByCity() {
    const params = useParams();

    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        console.log("Getting all PGs");
        axios
            .get("http://localhost:8080/paying_guest_houses/filter/" + params.city)
            .then((resp) => {
                console.log("After req processed....");
                console.log(resp.data);
                setPgs(resp.data);
                console.log(pgs);
            });

    }, []);

    return (
        <div className="container-fluid text-white">
            <h4 className="p-2 text-center">All Available Paying Guest Houses</h4>
            <table className="table table-bordered table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>PG Name</th>
                        <th>City</th>
                        <th>Image</th>
                        <th>PG Details Link</th>
                    </tr>
                </thead>
                <tbody>
                    {pgs.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.city}</td>
                            <td><img src={`http://localhost:8080/paying_guest_houses/${p.id}/image`}></img></td>
                            <td>
                                <Link to={`/getpgdetails/${p.id}`} >
                                    <button className="btn btn-info btn-sm">Get Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllPayingGuestHousesByCity;
