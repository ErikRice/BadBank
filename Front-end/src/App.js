import NavBar from "./Components/NavBar.js";
import Home from "./Components/Home.js";
import CreateAccount from "./Components/CreateAccount.js";
import Login from "./Components/Login.js";
import Deposit from "./Components/Deposit.js";
import Withdraw from "./Components/Withdraw.js";
import SessionData from "./Components/SessionData.js";
import { useAuth0 } from '@auth0/auth0-react'
import { UserContext } from "./Components/Context.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [ctxt, setCtxt] = useState([]);
  const [loggedIn, setLoggedIn] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginScreen, setLoginScreen] = useState(true);
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [show, setShow] = useState(true);

  //set some kind of timeout after certain period of inactivity to log user out?
  const { isAuthenticated, error, user, logout } = useAuth0();
  //sets the state of the loggin user


  useEffect(()=>{
    if (error) {
      console.log(error)
    }
  
    if (isAuthenticated && user) {
      (async () => {
        try {
          const response = await fetch("/account/login", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          });
          const authUser = await response.json();
          if (authUser.message) {
            setStatus(authUser.message);
            setTimeout(() => setStatus(""), 3000);
          }
          return [setLoggedIn([authUser.user[0], authUser.token]), setLoginScreen(false)];
        } catch (err) {
          console.log(err);
        }
      })();
    };
  },[isAuthenticated, error, user])

  //callback for handleLogin, addToAccount, and subtractFromAccount to check for an empty object (returns a boolean)

  const checkForUser = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const ctxtCreate = (user, transaction, string) => {
    const { name, balance } = user;
    let time = String(new Date());
    time = time.split(" ");
    time = String(time.splice(1, 4)).replace(/,/g, ' ')
    let session = {
      name: name,
      time: time,
      type: string,
      transaction: Number(transaction),
      balance: balance,
    };
    setCtxt([...ctxt, session]);
  };

  //for Login

  const handleLogin = ({ name, email, password }) => {
    if (!name) {
      setStatus("You need a name");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    if (!email) {
      setStatus("You need an email");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    if (!password) {
      setStatus("You need a password");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    (async () => {
      try {
        const response = await fetch("http://localhost:3080/account/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const user = await response.json();
        if (user.message) {
          setStatus(user.message);
          setTimeout(() => setStatus(""), 3000);
        }
        return [setLoggedIn([user.user[0], user.token]), setLoginScreen(false)];
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //for Logout

  const handleLogout = () => {
      logout({ returnTo: window.location.origin })
      setLoggedIn("");
      setStatus("You've successfully logged out");
      setTimeout(() => setStatus(""), 3000);
      setLoginScreen(true);
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
        const response = await fetch("/account/update", {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${loggedIn[1]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transaction }),
        });
        const updatedUser = await response.json();
        const token = loggedIn[1];
        ctxtCreate(updatedUser.user.value, deposit, "deposit");
        if (updatedUser.message) {
          setStatus(updatedUser.message);
          setTimeout(() => setStatus(""), 3000);
        }
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
    let transaction = Number(withdraw) * -1;
    (async () => {
      try {
        const response = await fetch("/account/update", {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${loggedIn[1]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transaction }),
        });
        const updatedUser = await response.json();
        if (updatedUser.message) {
          setStatus(updatedUser.message);
          setTimeout(() => setStatus(""), 3000);
        }
        const token = loggedIn[1];
        ctxtCreate(updatedUser.user.value, withdraw, "withdraw");

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
          <Route exact path="/" element={<Home loggedIn={loggedIn}/>} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route
            path="/login"
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
            path="/deposit"
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
            path="/withdraw"
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
          <Route path="/sessionData" element={<SessionData ctxt={ctxt} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
