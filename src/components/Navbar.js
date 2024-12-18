import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa'; // A more elegant book icon

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login');
    }, 100); // Small delay to ensure the state updates
  };

  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Icon and brand name with better styling */}
        <Link className="navbar-brand d-flex align-items-center" to="#">
          <FaBookOpen style={{ fontSize: '1.8rem', marginRight: '10px' }} />
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            iNotebook
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <form className="d-flex" role="search">
              <div>
                <Link
                  className="btn btn-primary mx-2"
                  to={'/signup'}
                  role="button"
                >
                  Signup
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to={'/login'}
                  role="button"
                >
                  Login
                </Link>
              </div>
            </form>
          ) : (
            <Link
              onClick={handleLogout}
              className="btn btn-primary mx-2"
              role="button"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
