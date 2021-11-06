import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import CreateAccount from "./Components/CreateAccount.js";
import Login from "./Components/Login.js";
import Deposit from "./Components/Deposit.js";
import Withdraw from "./Components/Withdraw.js";
import AllData from "./Components/AllData.js";
import { UserContext } from "./Components/Context.js";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [ctxt, setCtxt] = useState({ users: [] });
  const [loggedIn, setLoggedIn] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [show, setShow] = useState(true);

  //set some kind of timeout after certain period of inactivity to log user out?

  //sets the state of the loggin user

  function loggedInUser(user) {
    setLoggedIn(user);
  }

  //callback for handleLogin, addToAccount, and subtractFromAccount to check for an empty object (returns a boolean)

  const checkForUser = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const findUserInCtxt = (usersList) => {
    const currentUser = usersList.find((accountUser) => {
      if (
        accountUser.name === name &&
        accountUser.email === email &&
        accountUser.password === password
      ) {
        return true;
      }
      return false;
    });
    return currentUser;
  };

  //for Login

  const handleLogin = () => {
    const accountUsers = ctxt.users;
    const currentUser = findUserInCtxt(accountUsers);
    if (!checkForUser(currentUser)) {
      setLoginScreen(false);
      setStatus(`Welcome ${currentUser.name}!`);
      loggedInUser(currentUser);
      setName("");
      setEmail("");
      setPassword("");
    } else {
      setStatus("Login not recognized");
      setTimeout(() => setStatus(""), 2500);
    }
  };

  //for Logout

  const handleLogout = () => {
    setLoginScreen(true);
    loggedInUser("");
    setStatus("You've successfully logged out");
    setTimeout(() => setStatus(""), 3000);
  };

  //callback for Account in context addition/subtraction

  const changeAccountCtxt = (user) => {
    for (const account in ctxt.users) {
      if (account === user) {
        user.balance = account.balance;
        setLoggedIn(user);
        return user;
      }
    }
    let newUsers = { users: [...ctxt.users] };
    setCtxt(newUsers);
  };

  //add to Account

  const addToAccount = () => {
    if (Number(deposit) <= 0) {
      alert(`You can't deposit a negative number`);
      return;
    }
    if (isNaN(deposit)) {
      alert("Deposited amount needs to be a number");
      return;
    }
    if (checkForUser(loggedIn)) return;
    for (const user of ctxt.users) {
      if (user.name === loggedIn.name) {
        user.balance += Number(deposit);
        changeAccountCtxt(user);
        setShow(false);
        setTimeout(() => setShow(true), 3000);
        // alert(`You've successfully submitted $${deposit} into your account`);
        setDeposit("");
      }
    }
  };

  //subtract from Account

  const subtractFromAccount = () => {
    if (Number(withdraw) <= 0) return;
    if (isNaN(withdraw)) {
      alert("Withdrawn amount needs to be a number");
      return;
    }
    if (Number(withdraw) > loggedIn.balance)
      alert(
        "Overdraft Warning: You have withdrawn more than your account balance!"
      );
    if (checkForUser(loggedIn)) return;
    for (const user of ctxt.users) {
      if (user.name === loggedIn.name) {
        user.balance -= Number(withdraw);
        changeAccountCtxt(user);
        setShow(false);
        setTimeout(() => setShow(true), 3000);
        // alert(`You've successfully withdrawn $${withdraw} from your account`);
        setWithdraw("");
      }
    }
  };

  return (
    <Router>
      <NavBar loginScreen={loginScreen} />
      <UserContext.Provider value={{ ctxt, setCtxt }}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/createaccount/">
          <CreateAccount
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </Route>
        <Route path="/login/">
          <Login
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            status={status}
            loginScreen={loginScreen}
            setLoginScreen={setLoginScreen}
          />
        </Route>
        <Route path="/deposit/">
          <Deposit
            addToAccount={addToAccount}
            deposit={deposit}
            setDeposit={setDeposit}
            loggedIn={loggedIn}
            show={show}
          />
        </Route>
        <Route path="/withdraw/">
          <Withdraw
            withdraw={withdraw}
            setWithdraw={setWithdraw}
            subtractFromAccount={subtractFromAccount}
            loggedIn={loggedIn}
            show={show}
          />
        </Route>
        <Route path="/alldata/">
          <AllData />
        </Route>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
