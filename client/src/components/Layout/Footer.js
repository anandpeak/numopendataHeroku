import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaPhone, FaRegEnvelope, FaList } from 'react-icons/fa';

import './Footer.css';
import logo from './num_mgl.png';

const Footer = (props) => {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          backgroundColor: '#1b4588',
          width: '100%',
          marginTop: '150px',
        }}
      >
        <Link to="/" className="navbar-brand" href="#">
          <img src={logo} alt="logo"></img>
        </Link>

        <div className="container">
          <div className="col-md-4">
            <h4 className="contact">Холбоосууд</h4>
            <ul className="list-unstyled" style={{ paddingLeft: '70px' }}>
              <Link to="/">
                <li>
                  <FaList style={{ color: 'white' }} />
                  <span className="contactText">Нүүр</span>
                </li>
              </Link>
              <Link to="/struct">
                <li>
                  <FaList style={{ color: 'white' }} />
                  <span className="contactText">Бүтэц</span>
                </li>
              </Link>
              <Link to="/lesson">
                <li>
                  <FaList style={{ color: 'white' }} />
                  <span className="contactText">Хичээл</span>
                </li>
              </Link>
              <Link to="/enrollment">
                <li>
                  <FaList style={{ color: 'white' }} />
                  <span className="contactText">Элсэлт</span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-md-5">
            <h4 className="contact">Холбоо барих</h4>
            <ul className="list-unstyled">
              <li>
                <FaMapMarkedAlt style={{ color: 'white' }} />
                <span className="contactText">
                  11р хороолол, 7р хороо, Сүхбаатар дүүрэг, Улаанбаатар
                </span>
              </li>
              <li>
                <FaPhone style={{ color: 'white' }} />
                <span className="contactText">80201929</span>
              </li>
              <li>
                <FaRegEnvelope style={{ color: 'white' }} />
                <span className="contactText">anand21mn@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Footer;
