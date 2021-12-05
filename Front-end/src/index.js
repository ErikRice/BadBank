import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";

// const onRedirectCallback = () => {
// //   // If using a Hash Router, you need to use window.history.replaceState to
// //   // remove the `code` and `state` query parameters from the callback url.
//   window.history.replaceState({}, document.title, window.location.pathname);
//   // history.replace((appState && appState.returnTo) || window.location.pathname);
// };

ReactDOM.render(
  <Auth0Provider
  domain="dev-5s4p9lw2.us.auth0.com"
  clientId="iHeIWjcXryJsREyOyzbcoxGKB5pfdPS3"
  redirectUri={window.location.origin}
  // onRedirectCallback={onRedirectCallback}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
