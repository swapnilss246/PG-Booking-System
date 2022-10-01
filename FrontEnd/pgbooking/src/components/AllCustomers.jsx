import axios from "axios";
import { useEffect, useState } from "react";

function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/customer/getall").then((resp) => {
      setCustomers(resp.data);

      console.log(resp.data);
      console.log(customers);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="text-white p-2 text-center">All Customers</h4>
      <table className="table table-bordered table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Id</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>City</th>
            <th>Date Of Birth</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.phone}</td>
              <td>{x.gender}</td>
              <td>{x.city}</td>
              <td>{(new Date(x.dateOfBirth)).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllCustomers;
