import { useState } from "react";
import Card from "./Card.js";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { ctxt } = useContext(UserContext);

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
      setStatus("You need a name to create an account");
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if (!email) {
      setStatus("You need an email to create an account");
      setTimeout(()=> setStatus(''), 3000);
      return;
    }
    if (password.length < 8) {
      setStatus("Your password needs to be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    const user = { name, email, password };
    (async () => {
      try {
      const response = await fetch("/account/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const  newUser = await response.json();
      return [
        setName(""),
        setEmail(""),
        setPassword(""),
        setStatus(newUser.user.name),
        setShow(false),
      ];
    } catch (err) {
      console.log(err);
    }
    })() 
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
            <h6>Now you can login with your account, {status}.</h6>
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
