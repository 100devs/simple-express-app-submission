import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  Navbar, Nav, Container,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../css/style.css';

// We import NavLink to utilize the react router.
import logo from '../assets/logo.png';

// Here, we display our Navbar
export default function Mynavbar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <NavLink className="navbar-brand" to="/">
            <img style={{ width: `${55}%` }} src={logo} alt="logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" activeKey={window.location.pathname}>
              <Nav.Link href="/create">New Character</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  );
}
