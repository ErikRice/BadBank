import { useState, useContext } from 'react';
import Card from './Card.js';
import Form from './Form.js'
import { UserContext } from './Context.js'

function CreateAccount({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) {
  
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const {ctxt} = useContext(UserContext);

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

  const searchForSimilar = (name, email) => {
    for (const user of ctxt.users) {
      if (user.name === name && user.email === email) {
        setStatus(`Error: That name and email combination is taken by another user`)
        setTimeout(() => setStatus(''), 3000);
        return true;
      } else return false;
    }
  };

//adds an account to the ctxt array

  const handleCreate = function () {
    if (searchForSimilar(name, email)) return;
    if (!name) {alert("You need a name to create an account"); return;}
    if (!email) {alert("You need an email to create an account"); return;}
    if ((password.length) < 8) {
      setStatus("Your password needs to be at least 8 characters"); 
      setTimeout(() => setStatus(''), 3000); 
      return;
    };
    ctxt.users.push({ name, email, password, balance: 100 });
    alert("You succesfully created an account!");
    setName("");
    setEmail("");
    setPassword("");
    setShow(false);
  };
  
  return (
    <Card
      bgcolor="info"
      header="Create Account"
      status={status}
      body={
        show ? (

            < Form 
                name={name} 
                setName={setName}   
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword}
                handleCreate={handleCreate}
            />
      
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
