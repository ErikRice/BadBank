import Card from "./Card.js";

function Deposit({ deposit, setDeposit, addToAccount, loggedIn, show }) {
  return (
    <>
      <Card
        header="Deposit"
        bgcolor="primary"
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
                id="deposit"
                className="form-control"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                id="submit"
                className="btn btn-light"
                onClick={addToAccount}
                disabled={!deposit || (deposit <= 0)}
              >
                Deposit
              </button>
            </>
          ) : (
            <>
              <h5>Success! Your deposit has been received!</h5>
            </>
          )
        }
      />
    </>
  );
}

export default Deposit;
