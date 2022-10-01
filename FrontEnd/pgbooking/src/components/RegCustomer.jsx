import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uservalidation from "../uservalidation";

function RegCustomer() {
  const [user, setUser] = useState({
    name: "",
    city: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(uservalidation(user));
    if (!user.gender) {
      errors.gender = "Gender is required";
    }
    setSubmitted(true);
  };

  useEffect(() => {
    // if (!user.gender) {
    //   errors.gender = "Gender is required";
    // }
    console.log(errors);
    console.log(Object.keys(errors).length)

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:8080/customer/register", user)
        .then((resp) => {
          console.log(resp);
          alert("Customer registered successfully");
          history.push("/clogin");
        })
        .catch((error) => {console.log("Error", error);
        alert("Registration Failed! Check Details Again!!!");
      });
        
    }
  }, [errors]);
  return (
    <div className="container">
      <div className="card shadow bg-dark mt-3 text-light">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Customer Registration Form</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Customer Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
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
                    <input
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.city && (
                      <small className="text-danger float-right">
                        {errors.city}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Gender</label>
                  <div className="col-sm-8">
                    <select
                      name="gender"
                      value={user.gender}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option>Select Gender</option>
                      <option value={"MALE"}>Male</option>
                      <option value={"FEMALE"}>Female</option>
                    </select>
                    {errors.gender && (
                      <small className="text-danger float-right">
                        {errors.gender}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email Id
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.email && (
                      <small className="text-danger float-right">
                        {errors.email}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Phone</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      maxLength="10"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.phone && (
                      <small className="text-danger float-right">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Date Of Birth</label>
                  <div className="col-sm-8">
                    <input
                      type="Date"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.dateOfBirth && (
                      <small className="text-danger float-right">
                        {errors.dateOfBirth}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.password && (
                      <small className="text-danger float-right">
                        {errors.password}
                      </small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Confirm Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.confirmPassword && (
                      <small className="text-danger float-right">
                        {errors.confirmPassword}
                      </small>
                    )}
                  </div>
                </div>
                <button className="btn btn-primary float-right">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegCustomer;
