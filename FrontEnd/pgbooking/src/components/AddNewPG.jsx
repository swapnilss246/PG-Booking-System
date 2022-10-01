import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import pgvalidation from "./pgvalidation";

function AddNewPG() {
  const [pg, setPg] = useState({
    name: "",
    city: "",
    locality: "",
    amenities: "",
    pgDescription: "",
    foodAvailability: "",
    type:"",
    noOfSingleSharing:"",
    singleSharingPrice:"",
    noOfDoubleSharing:"",
    doubleSharingPrice:"",
    noOfTripleSharing:"",
    tripleSharingPrice:"",
    image: ""
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setPg({ ...pg, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

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
      formData.append("name", pg.name);
      formData.append("city", pg.city);
      formData.append("locality", pg.locality);
      formData.append("amenities", pg.amenities);
      formData.append("pgDescription", pg.pgDescription);
      formData.append("foodAvailability", pg.foodAvailability);
      formData.append("type", pg.type);
      formData.append("noOfSingleSharing", pg.noOfSingleSharing);
      formData.append("singleSharingPrice", pg.singleSharingPrice);
      formData.append("noOfDoubleSharing", pg.noOfDoubleSharing);
      formData.append("doubleSharingPrice", pg.doubleSharingPrice);
      formData.append("noOfTripleSharing", pg.noOfTripleSharing);
      formData.append("tripleSharingPrice", pg.tripleSharingPrice);
      formData.append("image", selectedPhoto);
      console.log(pg);
      axios
        .post("http://localhost:8080/paying_guest_houses/register", formData)
        .then((resp) => {
          let result = resp.data;
          console.log(result);
          alert("PG saved successfully");
          history.push("/manageallpgs");
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Error saving PG Details");
        });
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Add New PG</h4>
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
                  <label className="col-sm-4 form-control-label">
                    City
                  </label>
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
                  <label className="col-sm-4 form-control-label ">PG Type</label>
                  <div className="col-sm-8 ">
                    <select
                      name="type"
                      value={pg.type}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option>Select</option>
                      <option value={"GENTS"}>GENTS</option>
                      <option value={"LADIES"}>LADIES</option>
                    </select>
                    {errors.type && (
                      <small className="text-danger float-right">
                        {errors.type}
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
                      value={pg.noOfSingleSharing}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.noOfSingleSharing && (
                      <small className="text-danger float-right">
                        {errors.noOfSingleSharing}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row ">
                  <label className="col-sm-4 form-control-label ">Single Sharing Price</label>
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
                      value={pg.noOfDoubleSharing}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.noOfDoubleSharing && (
                      <small className="text-danger float-right">
                        {errors.noOfDoubleSharing}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row ">
                  <label className="col-sm-4 form-control-label ">Double Sharing Price</label>
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
                      value={pg.noOfTripleSharing}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.noOfTripleSharing && (
                      <small className="text-danger float-right">
                        {errors.noOfTripleSharing}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row ">
                  <label className="col-sm-4 form-control-label ">Triple Sharing Price</label>
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
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Image</label>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      required
                      name="photo"
                      value={pg.photo}
                      onChange={handleFileInput}
                      className="form-control-file"
                    />
                  </div>
                </div>

                <button className="btn btn-primary float-right">
                  Add PG
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewPG;
