import React, { useState, ReactElement } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "@todo/state/actions/auth";
import { useDispatch } from "react-redux";
import { LOGOUT } from "@todo/state/actions/types";

type Props = {
  isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
  } 
  if (isAuthenticated) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="btn btn-info">Simple Todo List</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/lists">
                  Todo Lists
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <button className="btn nav-link" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/">Todo List</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " to="/">
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
