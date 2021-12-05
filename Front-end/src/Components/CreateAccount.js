import { useState } from "react";
import Card from "./Card.js";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");

  //shows the create account screen

  const clearForm = () => {
    setShow(true);
  };

  const showPass = () => {
    const passwordInput = document.querySelector('#createPassword');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }

  }

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
      if (user.message) {setStatus(user.message); setTimeout(() => setStatus(""), 3000)}
      console.log(newUser);
      return [
        setName(""),
        setEmail(""),
        setPassword(""),
        setNewUserName(newUser.userData[0].name),
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
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="name"
              className="form-control"
              id="createName"
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
              id="createEmail"
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
              id="createPassword"
              placeholder="Enter Account Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="checkbox" onClick={showPass}/><h6 style={{display: "inline-block", paddingLeft: "5px" }}>Show Password</h6>
            <h6 id="error">{status}</h6>
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
            <h6> Welcome, {newUserName}. Now you can login with your account.</h6>
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
