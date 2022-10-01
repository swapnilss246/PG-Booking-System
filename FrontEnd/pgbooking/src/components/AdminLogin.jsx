import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import ReCAPTCHA from "react-google-recaptcha";

function AdminLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "admin"
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errmsg, setErrmsg] = useState();
  
  const [verified, setVerified] = useState(false);

  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
    
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      axios
        .post("http://localhost:8080/admin/validate", user)
        .then((resp) => {
          let result = resp.data;
          console.log(resp.data);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", user.role);
          sessionStorage.setItem("id", result.id);
          dispatch({ type: "IsLoggedIn" });
          history.push("/");
        })
        .catch((error) => {
          console.log("Error", error);
          setErrmsg("Invalid email or password..!!");
        });
    }
  }, [errors]);
  
  const handleCaptcha = (value) =>{
    console.log("Captcha value:", value);
    setVerified(true);
  }

  return (
    <div className="container ">
      <div className="card shadow mt-3 bg-dark text-light ">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Admin Login Form</h4>
              <form onSubmit={handleSubmit}>
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
                <ReCAPTCHA className="text-center"
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  // sitekey="6Ldx1zYiAAAAAAwhHqzkvMQRKfigLb7GVKLEkQKa"
                  onChange={handleCaptcha}
                />
                <button disabled={!verified} className="btn btn-primary float-right">
                  Login Now
                </button>
              </form>
              <div className="clearfix"></div>
              {errmsg && (
                <p className="alert alert-danger mt-4 text-center font-weight-bold">
                  {errmsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
