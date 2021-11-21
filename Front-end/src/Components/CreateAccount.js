import { useState, useContext } from "react";
import Card from "./Card.js";
import { UserContext } from "./Context.js";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { ctxt } = useContext(UserContext);

  //shows the create account screen

  const clearForm = () => {
    setShow(true);
  };

  //validates account info and sends error if missing info (for now I am using alerts)

  // const validate = (field, label) => {
  //   if (!field) {
  //     setStatus("Error: " + label);
  //     setTimeout(() => setStatus(''), 3000);
  //     return false;
  //   }
  //   return true;
  // // };
  // if (!validate(name, "You need a name")) return;
  // if (!validate(email, "You need an email")) return;
  // if (!validate(password, "You need a password")) return;

  // const searchForSimilar = (name, email) => {
  //   for (const user of ctxt.users) {
  //     if (user.name === name && user.email === email) {
  //       setStatus(`Error: That name and email combination is taken by another user`)
  //       setTimeout(() => setStatus(''), 3000);
  //       return true;
  //     } else return false;
  //   }
  // };

  //adds an account to the ctxt array

  const handleCreate = () => {
    // if (searchForSimilar(name, email)) return;

    if (!name) {
      alert("You need a name to create an account");
      return;
    }
    if (!email) {
      alert("You need an email to create an account");
      return;
    }
    if (password.length < 8) {
      setStatus("Your password needs to be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    console.log(`userInfo:${name},${email},${password}`);
    const user = { name, email, password };
    (async () => {
      await fetch(`http://localhost:3080/account/create`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(user),
      });
    })()
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.status === 404) {
          throw new Error();
        }
        response.json();
      })
      .then((status) => {
        console.log(status);
        setShow(false);
        setName("");
        setEmail("");
        setPassword("");
        setShow(false);
        ctxt.users.push({ name, email, password, balance: 100 });
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
  return (
    <Card
      bgcolor="info"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="name"
              className="form-control"
              id="loginName"
              placeholder="Enter Account Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            Email
            <br />
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="Enter Account Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Enter Account Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              id="Create Button"
              onClick={() => handleCreate()}
              disabled={!name && !email && !password}
            >
              Create an Account
            </button>
          </>
        ) : (
          <div className="text-center">
            <h5>Success!</h5>
            <h6>Now you can login with your account.</h6>
            <br />
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add Another Account?
            </button>
          </div>
        )
      }
    />
  );
}

export default CreateAccount;
