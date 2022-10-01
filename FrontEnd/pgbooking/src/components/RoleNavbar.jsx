import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import LoginRegisterMenu from "./LoginRegisterMenu";

const RoleNavbar = ({ isLoggedIn }) => {
  const logout = (e) => {
    dispatch({ type: "LogOut" });
    sessionStorage.clear();
    history.push("/"); //navigate ,/windows.href.location
  };
  // const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(sessionStorage.getItem("role"), isLoggedIn);
  if (!isLoggedIn) {
    return <LoginRegisterMenu />;
  } else if (sessionStorage.getItem("role") === "customer") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/cprofile">
            {/* <AccountCircleIcon></AccountCircleIcon> */}
            Profile
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/mybookings">
            My Bookings
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" onClick={logout} to="#">
            {/* <LogoutIcon></LogoutIcon> */}
            Logout
          </Link>
        </li>
      </ul>
    );
  } else if (sessionStorage.getItem("role") === "admin") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/aprofile">
            Profile
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/addnewpg">
            Add New PG
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/manageallpgs">
            Manage PGs
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/allcustomers">
            Customers
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" to="/allbookings">
            Bookings
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link text-light" onClick={logout} to="#">
            Logout
          </Link>
        </li>
      </ul>
    );
  }
};

export default RoleNavbar;
