import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import pgvalidation from "./pgvalidation";

function EditPgDetails() {
    const params = useParams();

    const [errors, setErrors] = useState({});
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const [pg, setPg] = useState({
        pgId: params.id,
        name: "",
        city: "",
        locality: "",
        amenities: "",
        pgDescription: "",
        foodAvailability: "",
        singleSharingPrice: "",
        doubleSharingPrice: "",
        tripleSharingPrice: "",
        image: ""
    });

    const handleInput = (e) => {
        setPg({ ...pg, [e.target.name]: e.target.value });
    };

    const handleFileInput = (e) => {
        setSelectedPhoto(e.target.files[0]);
    };

    useEffect(() => {
        if (sessionStorage.getItem("role") !== "admin") {
            alert("Please Login!");
            history.push("/alogin");
        }

        axios.get("http://localhost:8080/paying_guest_houses/details/" + params.id).then((resp) => {
            console.log(resp.data);
            setPg(resp.data);
        });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(pgvalidation(pg));
        setSubmitted(true);
    };

    useEffect(() => {

        if (sessionStorage.getItem("role") !== "admin") {
            alert("Please Login!");
            history.push("/alogin");
        }

        console.log(errors);
        if (Object.keys(errors).length === 0 && submitted) {
            const formData = new FormData();
            formData.append("pgId", pg.pgId);
            formData.append("name", pg.name);
            formData.append("city", pg.city);
            formData.append("locality", pg.locality);
            formData.append("amenities", pg.amenities);
            formData.append("pgDescription", pg.pgDescription);
            formData.append("foodAvailability", pg.foodAvailability);
            formData.append("noOfSingleSharing", pg.noOfSingleSharing);
            formData.append("singleSharingPrice", pg.singleSharingPrice);
            formData.append("noOfDoubleSharing", pg.noOfDoubleSharing);
            formData.append("doubleSharingPrice", pg.doubleSharingPrice);
            formData.append("noOfTripleSharing", pg.noOfTripleSharing);
            formData.append("tripleSharingPrice", pg.tripleSharingPrice);
            console.log(pg);

            axios
                .put("http://localhost:8080/paying_guest_houses/update", pg)
                .then((resp) => {
                    alert("PG Details Updated Successfully!!!");
                    history.push("/manageallpgs");
                })
                .catch((error) => {
                    console.log("Error", error);
                    alert("Error In Updating PG Details!!!");
                });
        }
    }, [errors]);


    return (
        <div className="container text-white">
            <div className="row">
                <div className="col-sm-7 mx-auto">
                    <div className="card shadow bg-dark mt-3">
                        <div className="card-body">
                            <h4 className="p-2 text-center">Edit PG Details</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">
                                        PG Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="name"
                                            value={pg.name}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.name && (
                                            <small className="text-danger float-right">
                                                {errors.name}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">City</label>
                                    <div className="col-sm-8">
                                        <select
                                            name="city"
                                            value={pg.city}
                                            onChange={handleInput}
                                            className="form-control"
                                        >
                                            <option>Select City</option>
                                            <option value={"PUNE"}>PUNE</option>
                                            <option value={"MUMBAI"}>MUMBAI</option>
                                            <option value={"DELHI"}>DELHI</option>
                                            <option value={"BANGLORE"}>BANGLORE</option>
                                        </select>
                                        {errors.city && (
                                            <small className="text-danger float-right">
                                                {errors.city}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Locality</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="text"
                                            name="locality"
                                            value={pg.locality}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.locality && (
                                            <small className="text-danger float-right">
                                                {errors.locality}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Amenities Provided In PG</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="text"
                                            name="amenities"
                                            value={pg.amenities}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.amenities && (
                                            <small className="text-danger float-right">
                                                {errors.amenities}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">PG Description</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="text"
                                            name="pgDescription"
                                            value={pg.pgDescription}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.pgDescription && (
                                            <small className="text-danger float-right">
                                                {errors.pgDescription}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Is Food Available In PG?</label>
                                    <div className="col-sm-8 ">
                                        <select
                                            name="foodAvailability"
                                            value={pg.foodAvailability}
                                            onChange={handleInput}
                                            className="form-control"
                                        >
                                            <option>Select</option>
                                            <option value={"YES"}>YES</option>
                                            <option value={"NO"}>NO</option>
                                        </select>
                                        {errors.foodAvailability && (
                                            <small className="text-danger float-right">
                                                {errors.foodAvailability}
                                            </small>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">No of Single Sharing Rooms</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="noOfSingleSharing"
                                            readOnly
                                            value={pg.noOfSingleSharing}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Update Single Sharing Price</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="singleSharingPrice"
                                            value={pg.singleSharingPrice}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.singleSharingPrice && (
                                            <small className="text-danger float-right">
                                                {errors.singleSharingPrice}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">No of Double Sharing Rooms</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="noOfDoubleSharing"
                                            readOnly
                                            value={pg.noOfDoubleSharing}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Update Double Sharing Price</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="doubleSharingPrice"
                                            value={pg.doubleSharingPrice}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.doubleSharingPrice && (
                                            <small className="text-danger float-right">
                                                {errors.doubleSharingPrice}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">No of Triple Sharing Rooms</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="noOfTripleSharing"
                                            readOnly
                                            value={pg.noOfTripleSharing}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group form-row ">
                                    <label className="col-sm-4 form-control-label ">Update Triple Sharing Price</label>
                                    <div className="col-sm-8 ">
                                        <input
                                            type="number"
                                            name="tripleSharingPrice"
                                            value={pg.tripleSharingPrice}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        {errors.tripleSharingPrice && (
                                            <small className="text-danger float-right">
                                                {errors.tripleSharingPrice}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <button className="btn btn-primary float-right">
                                    Update PG Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPgDetails;
