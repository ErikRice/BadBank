import Card from './Card.js';
import Form from './Form.js'

function Login({
  handleLogin,
  handleLogout,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  status,
  loginScreen
}) {

  return (
    <Card
      header="Account Login"
      bgcolor="info"
      body={
        loginScreen ? (
          <>
            < Form name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setLogin={handleLogin}/>
          </>
        ) : (
          <div className="text-center">
            <h4>{status}</h4>
            <h6>You have successfully logged in!</h6>
            <button type="submit" className="form-control" id="Logout Button" onClick={handleLogout}>Logout?</button>
          </div>
        )
      }
    />
  );
}

//install ternary operator to switch to Create Account Component (which is written in CreateAccount.js)
export default Login;
