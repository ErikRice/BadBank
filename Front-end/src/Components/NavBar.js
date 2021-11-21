import { Link } from 'react-router-dom';
import "../NavBar.css";
import Bank from '../bank.png';

function Navbar({loginScreen, loggedIn}) {
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
            <Link  className="nav-link" to="/login/" title="Login to access your account">
              {loginScreen ? "Login" : "Logout" }
            </Link>
          </li>
          <li  className="nav-item">
            {loggedIn._id ? null :
              <Link  className="nav-link" to="/createaccount/" title="Create an account">
              Create Account
              </Link> 
            }
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/deposit/" title="While logged in, deposit money to your account">
              Deposit
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/withdraw/" title="While logged in, withdraw money from your account">
              Withdraw
            </Link>
          </li>
          <li  className="nav-item">
            <Link  className="nav-link" to="/alldata/" title="All existing users and their information">
              AllData
            </Link>
          </li>
        </ul>
      </div>
      {loggedIn.name ? <div className="navbar-brand" id="loggedInName">{`Welcome, ${loggedIn.name}`}</div> : null}
    </nav>
  );
}

export default Navbar;
