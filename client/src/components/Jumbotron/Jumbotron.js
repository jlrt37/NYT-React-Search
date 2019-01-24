import React from "react";
import { Link } from "react-router-dom";
import './Jumbotron.css';
import Background from './images/nyt_banner.png';

var jumbotronStyle = {
  backgroundSize : `contain`,
  backgroundRepeat : `no-repeat`,
  backgroundPosition : `center`,
  height: 300,
  clear: `both`,
  backgroundImage: `url(${Background})`,
  backgroundColor: `inherit`
}

const Jumbotron = ({ children }) => (
  <Link to="/">
    <div style={jumbotronStyle} className="jumbotron container">
      {children}
    </div>
  </Link>
);

export default Jumbotron;
