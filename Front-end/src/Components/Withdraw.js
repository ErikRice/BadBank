import Card from "./Card.js";

function Withdraw({
  withdraw,
  setWithdraw,
  subtractFromAccount,
  loggedIn,
  show,
}) {
  return (
    <Card
      header="Withdraw"
      bgcolor="warning"
      txtcolor="black"
      body={
        show ? (
          <>
            <label id="deposit">
              {loggedIn
                ? `Account Balance $${loggedIn[0].balance}`
                : "You need to login first"}
            </label>
            <input
              type="number"
              id="withdraw"
              className="form-control"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              id="submit"
              className="btn btn-light"
              onClick={subtractFromAccount}
              disabled={!withdraw || (withdraw <= 0)}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Success! Your withdrawal was processed!</h5>
          </>
        )
      }
    />
  );
}

export default Withdraw;
