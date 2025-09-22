import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Button } from 'react-bootstrap';

function Navbar({ token, role, logout }) {
  return (
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand href="/">Pooja Kit</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
          {token && <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>}
          {token && <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>}
          <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          {role === 'ADMIN' && <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>}
        </Nav>
        <Nav>
          {token ? (
            <Button variant="outline-primary" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
}

export default Navbar;