import { Link } from 'react-router-dom';
import "../NavBar.css";
import Bank from '../bank.png';

function Navbar({loginScreen}) {
  return (
    <nav  className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div  className="navbar-brand">
      <img src={Bank} alt="bank-logo" width="22" height="24" className="d-inline-block align-text-top" style={{marginRight: ".5em", marginLeft: ".5em"}}/>
        Bad Bank
      </div>
      <button
         className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span  className="navbar-toggler-icon"></span>
      </button>
      <div  className="collapse navbar-collapse" id="navbarNav">
        <ul  className="navbar-nav">
          <li  className="nav-item">
            <Link  className="nav-link" to="/" title="Homepage for Bad Bank">
              Home 
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/Login/" title="Login to access your account">
              {loginScreen ? "Login" : "Logout" }
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/createaccount/" title="Create an account">
              Create Account
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/Deposit/" title="While logged in, deposit money to your account">
              Deposit
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/Withdraw/" title="While logged in, withdraw money from your account">
              Withdraw
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/AllData/" title="All existing users and their information">
              AllData
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
