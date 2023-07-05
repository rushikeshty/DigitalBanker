import React from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <MDBNavbar  color="default-color" dark expand="lg" className="navbar">
      <MDBNavbarBrand>
        <MDBNavLink to="/">
           <span style={{fontSize:"35px"}} className="font-weight-bold">Banking System</span>
        </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarNav right>
      <div className="nav-items-container">
        <MDBNavItem className="font-weight-bold">
          <MDBNavLink to="/customers" className="nav-link-effect">
           Customers 
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem  className="font-weight-bold">
          <MDBNavLink to="/transactions" className="nav-link-effect">
          Transactions
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem className="font-weight-bold">       
          <MDBNavLink  to="/add"  className="nav-link-effect">
          New Customer
          </MDBNavLink>
        </MDBNavItem>
        </div>
      </MDBNavbarNav>
    </MDBNavbar>
  );
}
