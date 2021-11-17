function Form(props) {
  //pass state to values
  return (
    <>
      Name
      <br />
      <input
        type="name"
        className="form-control"
        id="loginName"
        placeholder="Enter Account Name..."
        value={props.name}
        onChange={(e) => props.setName(e.target.value)}
      />
      <br />
      Email
      <br />
      <input
        type="email"
        className="form-control"
        id="loginEmail"
        placeholder="Enter Account Email..."
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        id="loginPassword"
        placeholder="Enter Account Password..."
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
      />
      <br />
      {props.handleCreate ? (
        <button
          type="submit"
          className="form-control"
          id="Create Button"
          onClick={props.handleCreate}
          disabled={!props.name && !props.email && !props.password}
        >
          Create an Account
        </button>
      ) : (
        <button
          type="submit"
          className="form-control"
          id="Login Button"
          onClick={props.handleLogin}
          disabled={!props.name && !props.email && !props.password}
        >
          Login
        </button>
      )}
    </>
  );
}

export default Form;
