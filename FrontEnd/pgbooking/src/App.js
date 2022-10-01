import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import TopSlider from './components/TopSlider';
import Footer from "./components/Footer";

//==========  Customer components ============
import RegCustomer from './components/RegCustomer';
import CustomerLogin from './components/CustomerLogin';
import CustomerProfile from './components/CustomerProfile';
import AllCustomers from './components/AllCustomers';


//==========  Admin components ============
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';


//==========  PG components ============
import AddNewPG from './components/AddNewPG';
import AllPGs from './components/AllPGs';
import PgDetails from './components/PgDetails';
import ManageAllPgs from './components/ManageAllPgs';
import EditPgDetails from './components/EditPgDetails';
import AllPayingGuestHousesByCity from './components/AllPgsByCity';

//==========  Booking components ============
import BookRoomInPg from './components/BookRoomInPg';
import MyBookings from './components/MyBookings';
import AllBookings from './components/AllBookings';


import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pgs, setPgs] = useState([]);
  const [showPgs, setShowPgs] = useState([]);

  const resetFilter = () => {
    setShowPgs(pgs);
  }
  useEffect(() => {
    console.log("Getting all PGs");
    axios
      .get("http://localhost:8080/paying_guest_houses/getall")
      .then((resp) => {

        console.log("After req processed....");
        console.log(resp.data);
        setPgs(resp.data);
        setShowPgs(resp.data);
        console.log(pgs);
      });
  }, []);

  const filterByCity = (city) => {
    setShowPgs(pgs.filter(p => p.city === city))
  }
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <NavBar getByCity={filterByCity} reset={resetFilter} />
        <div className="container-fluid p-2">
          <TopSlider />
        </div>
        <Switch>

          <Route render={() => <AllPGs pgs={showPgs} />} path="/" exact />

          <Route component={RegCustomer} path="/register" />
          <Route component={CustomerLogin} path="/clogin" />
          <Route component={CustomerProfile} path="/cprofile" />
          <Route component={AdminLogin} path="/alogin" />
          <Route component={AdminProfile} path="/aprofile" />
          <Route component={AddNewPG} path="/addnewpg" />
          <Route component={PgDetails} path="/getpgdetails/:id" />
          <Route component={BookRoomInPg} path="/booknewroom" />
          <Route component={MyBookings} path="/mybookings" />
          <Route component={AllBookings} path="/allbookings" />
          <Route component={ManageAllPgs} path="/manageallpgs" />
          <Route component={EditPgDetails} path="/editpgdetails/:id" />
          <Route component={AllPayingGuestHousesByCity} path="/getbycity/:city" />
          <Route component={AllCustomers} path="/allcustomers" />

          <Route component={Footer} path="/footer" />

        </Switch>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
