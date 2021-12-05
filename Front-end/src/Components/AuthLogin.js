import { useAuth0 } from "@auth0/auth0-react";
import '../AuthLogin.css';
import { Button } from 'react-bootstrap';

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <Button className="auth-button" onClick={() => { loginWithRedirect()}}>Auth0 Login</Button>;
};

export default LoginButton;