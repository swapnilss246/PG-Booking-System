import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';

function Footer() {
  return (
    <div>
      <MyFooter></MyFooter>
    </div>
  );
}

function MyFooter() {
  return (
    <div className="container-fluid">
      <div className=" row mt-3 text-light bg-secondary" style={{ height: "30vh" }}>
        <div className="col-7 mt-2">
          <div>Contact Info</div>
          <div className=" mt-2">
            <WorkIcon></WorkIcon>
            &nbsp;PG Booking Office, Third Floor <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vedanta Towers, FC Road, Pune
          </div>
          <div className=" mt-2 ">
            <PhoneIcon></PhoneIcon>
            &nbsp;1800-000-0000
          </div>

          <div
            className="
            mt-2"
          >
            <EmailIcon></EmailIcon>
            &nbsp;pgbooking@hotmail.com
          </div>
        </div>
        <div className="col-3 mt-2">
          <div>About Us</div>
          <div className=" mt-2">
            Crammed up hostels or cooped up PGs - not much of a choice, is it? That's why we created PG Booking - a place designed by people who've been in your shoes. Understand you. And are inspired by you.
          </div>
        </div>
        {/* <div className="col-3 mt-2 ">
          <div>Connect with us</div>
          <div className="mt-2">
            <InstagramIcon></InstagramIcon> Instagram
          </div>
          <div className="mt-2">
            <FacebookIcon></FacebookIcon> Facebook
          </div>
          <div className="mt-2">
            <TwitterIcon></TwitterIcon> Twitter
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
