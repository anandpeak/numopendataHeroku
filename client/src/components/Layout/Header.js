import React from 'react';

import './Header.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: '#1b4588', width: '100%' }}
      >
        <Link to="/" className="navbar-brand" href="#">
          <img src={logo} alt="logo"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link" href="#">
                <p>Нүүр</p> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/struct" className="nav-link" href="#">
                <p>Бүтэц</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lesson" className="nav-link">
                <p>Хичээл</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/enrollment" className="nav-link">
                <p>Элсэлт</p>
              </Link>
            </li>
          </ul>
          {/* <span class="navbar-text">Navbar text with an inline element</span> */}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
