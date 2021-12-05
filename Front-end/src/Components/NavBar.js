import { Link } from "react-router-dom";
import Bank from "../bank.png";
import "../NavBar.css";

function Navbar({ loginScreen, loggedIn }) {
  return (
    <nav className="navbar shadow-sm navbar-expand-lg navbar-dark d-flex p-3 bd-highlight">
      <div className="navbar-brand">
        <img
          src={Bank}
          alt="bank-logo"
          width="40"
          height="40"
          className="d-inline-flex mx-3"
        />
        <span id="bank-text">Bad Bank</span>
      </div>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" title="Homepage for Bad Bank">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/login"
              title="Login to access your account"
            >
              {loginScreen ? "Login" : "Logout"}
            </Link>
          </li>
          <li className="nav-item">
            {loggedIn ? null : (
              <Link
                className="nav-link"
                to="/createaccount"
                title="Create an account"
              >
                Create Account
              </Link>
            )}
          </li>
          <li className="nav-item">
            {loggedIn ? (
                  <Link
                  className="nav-link"
                  to="/deposit"
                  title="While logged in, deposit money to your account"
                >
                  Deposit
                </Link>
            ) : null}
        
          </li>
          <li className="nav-item">
            {loggedIn ? ( 
              <Link
                className="nav-link"
                to="/withdraw"
                title="While logged in, withdraw money from your account"
              >
                Withdraw
              </Link>
            ) : null}
          </li>
          <li className="nav-item">
          {loggedIn ? (
            <Link
              className="nav-link"
              to="/sessionData"
              title="All existing users and their information"
            >
              Session Data
            </Link>
            ) : null}
          </li>
        </ul>
      </div>
      {loggedIn ? (
        <div
          className="navbar-brand"
          id="loggedInName"
        >{`Welcome, ${loggedIn[0].name}`}</div>
      ) : null}
    </nav>
  );
}

export default Navbar;
