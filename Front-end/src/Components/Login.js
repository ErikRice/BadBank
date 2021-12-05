import Card from './Card.js';
import { useState } from 'react';
import LoginButton from './AuthLogin.js'



function Login({
  handleLogin,
  handleLogout,
  status,
  loginScreen,
  handleAuthUser
}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  return (
    <Card
      header="Account Login"
      body={
        loginScreen ? (
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
        <h6 id="error">{status}</h6>
        <br />
          <button
            type="submit"
            className="btn btn-primary"
            id="Create Button"
            onClick={() => handleLogin({name, email, password})}
            disabled={!name && !email && !password}
          >
            Login
          </button>
          <LoginButton handleAuthUser={handleAuthUser}/>
      </>
        ) : (
          <div className="text-center">
            <h4>{status}</h4>
            <h6>You have successfully logged in!</h6>
              <button type="submit" className="form-control" id="Logout Button" onClick={() => { window.location.replace("/"); setName(""); setEmail(""); setPassword(""); handleLogout()}}>Logout?</button>
          </div>
        )
      }
    />
  );
}

export default Login;
