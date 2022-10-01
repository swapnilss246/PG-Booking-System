import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function AdminProfile() {
  const email = sessionStorage.getItem("email");
  const [uname, setUname] = useState(sessionStorage.getItem("uname"));
  const id = sessionStorage.getItem("id");

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    uname: uname,
    email: email,
    phone:""
  });

  useEffect(() => {
    axios.get("http://localhost:8080/admin/" + id).then((resp) => {
      console.log(resp.data);
      setUser(resp.data);
    });
  }, []);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/admin" , user)
      .then((resp) => {
        console.log(resp);
        alert("Profile updated successfully");
        sessionStorage.setItem("uname", user.uname);
      })
      .catch((error) => console.log("Error", error));
  };

  return (
    <div className="container-fluid">
      <h4 className="p-2 text-white text-center">Welcome {user.uname}</h4>
      <div className="row">
        <div className="col-sm-5 mx-auto">
          <div className="card shadow bg-dark text-light">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Email ID
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="email"
                      readOnly
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    User Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="uname"
                      value={user.uname}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">
                    Phone
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <button className="btn btn-primary float-right">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
