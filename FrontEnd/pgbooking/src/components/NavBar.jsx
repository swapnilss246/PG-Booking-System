import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";

const { Fragment, useState } = require("react");

function NavBar(props) {

   const pune = "pune";
   const mumbai = "mumbai";
   const banglore = "banglore";
   const delhi = "delhi";

  const state = useSelector((state) => state);
const history = useHistory();
  return (
    <Fragment>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-warning  position-sticky"
        style={{ top: 0, zIndex: "1000" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-light"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
          <li className="nav-item active">
              <button className="btn btn-secondary" onClick={(e)=>{e.preventDefault(); history.push("/"); props.reset()}}>
                HOME
              </button>
            </li>
            <li> &nbsp; </li>
            <li className="nav-item active">
              <button className="btn btn-secondary" onClick={(e)=>{e.preventDefault(); history.push("/"); props.getByCity("PUNE")}}>
                PUNE
              </button>
            </li>
            <li> &nbsp; </li>
            <li className="nav-item active">
              <button type="button" className="btn btn-secondary" onClick={(e)=>{e.preventDefault(); history.push("/"); props.getByCity("MUMBAI")}}>
                MUMBAI
              </button>
            </li>
            <li> &nbsp; </li>
           
            <li className="nav-item active">
              <button className="btn btn-secondary" onClick={(e)=>{e.preventDefault();history.push("/"); props.getByCity("DELHI")}}>
                DELHI
              </button>
            </li>
            <li> &nbsp; </li>
            <li className="nav-item active">
              <button className="btn btn-secondary" onClick={(e)=>{e.preventDefault(); history.push("/"); props.getByCity("BANGLORE")}}>
                BANGLORE
              </button>
            </li>
            </ul>
          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;
