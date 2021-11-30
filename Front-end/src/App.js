import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import CreateAccount from "./Components/CreateAccount.js";
import Login from "./Components/Login.js";
import Deposit from "./Components/Deposit.js";
import Withdraw from "./Components/Withdraw.js";
import AllData from "./Components/AllData.js";
import { UserContext } from "./Components/Context.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [ctxt, setCtxt] = useState({ users: [] });
  const [loggedIn, setLoggedIn] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [show, setShow] = useState(true);
  // const client = useClient();

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

  //for Login

  const handleLogin = (props) => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3080/account/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        });
        const user = await response.json();
        return [setLoggedIn([user.user[0], user.token]), setLoginScreen(false)];
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //for Logout

  const handleLogout = () => {
    setLoginScreen(true);
    loggedInUser("");
    setStatus("You've successfully logged out");
    setTimeout(() => setStatus(""), 3000);
  };

  //Deposit

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
    let transaction = Number(deposit);
    (async () => {
      try {
        const response = await fetch(`http://localhost:3080/account/update`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Authorization": `Bearer ${loggedIn[1]}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({transaction}),
        });
        const updatedUser = await response.json();
        const token = loggedIn[1];
        return [
          setLoggedIn([updatedUser.user.value, token]),
          setShow(false),
          setTimeout(() => setShow(true), 2200),
          setDeposit(""),
        ];
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //Withdraw

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
    let transaction = (Number(withdraw) * -1 );
    (async () => {
      try {
        const response = await fetch(`http://localhost:3080/account/update`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Authorization": `Bearer ${loggedIn[1]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({transaction}),
        });
        const updatedUser = await response.json();
        const token = loggedIn[1];
        return [
          setLoggedIn([updatedUser.user.value, token]),
          setShow(false),
          setTimeout(() => setShow(true), 2200),
          setWithdraw(""),
        ];
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <BrowserRouter>
      <NavBar loginScreen={loginScreen} loggedIn={loggedIn} />
      <UserContext.Provider value={{ ctxt, setCtxt }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createaccount/" element={<CreateAccount />} />
          <Route
            path="/login/"
            element={
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
            }
          />
          <Route
            path="/deposit/"
            element={
              <Deposit
                addToAccount={addToAccount}
                deposit={deposit}
                setDeposit={setDeposit}
                loggedIn={loggedIn}
                show={show}
              />
            }
          />
          <Route
            path="/withdraw/"
            element={
              <Withdraw
                withdraw={withdraw}
                setWithdraw={setWithdraw}
                subtractFromAccount={subtractFromAccount}
                loggedIn={loggedIn}
                show={show}
              />
            }
          />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
