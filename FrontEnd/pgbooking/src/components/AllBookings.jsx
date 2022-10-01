import axios from "axios";
import { useEffect, useState } from "react";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/bookings/getall").then((resp) => {
      setBookings(resp.data);

      console.log(resp.data);
      console.log(bookings);
    });
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="text-white p-2 text-center">All Bookings</h4>
      <table className="table table-bordered table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer ID</th>
            <th>PG ID</th>
            <th>Room ID</th>
            <th>Booking Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((x) => (
            <tr key={x.id}>

              <td>{x.id}</td>
              <td>{x.customerId}</td>
              <td>{x.pgId}</td>
              <td>{x.roomId}</td>
              <td>{(new Date(x.bookingDate)).toDateString()}</td>
              <td>{(new Date(x.startDate)).toDateString()}</td>
              <td>{(new Date(x.endDate)).toDateString()}</td>
              <td>{x.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllBookings;
