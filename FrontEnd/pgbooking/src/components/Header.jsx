import { useSelector } from "react-redux";

function Header() {
  const state = useSelector((state) => state);
  console.log("Header ", state.loggedin.Username);
  return (
    <div className="jumbotron p-3 mb-0 rounded-0 bg-light ">
      <img
        src={"pgbookinglogo.png"}
        style={{ width: "290px", height: "90px" }}
        className="rounded mx-auto d-block"
      />
      {state.loggedin.IsLoggedIn ? (
        <>
          <h5 className="float-right">
            Welcome {state.loggedin.Username} !
          </h5>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
