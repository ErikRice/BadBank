import { useAuth0 } from "@auth0/auth0-react";
import '../AuthLogin.css'

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <button className="auth-button"onClick={() => { loginWithRedirect()}}>Auth0 Log In</button>;
};

export default LoginButton;