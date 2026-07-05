import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <ul className="nav-links">
          <li><Link to="/">الرئيسية</Link></li>
          <li><Link to="/store">المتجر الهندسي</Link></li>
          <li><Link to="/ai">أداة التسعير</Link></li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;