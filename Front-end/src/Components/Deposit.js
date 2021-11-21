// import { UserContext } from './Context.js' 
import Card from './Card.js'
// import { useState } from 'react';



function Deposit({deposit, setDeposit, addToAccount, loggedIn, show}) {

  return (
    <>
      <Card
        header="Deposit"
        bgcolor="primary"
        body={
          show ? (
            <>
                <label id="deposit">{loggedIn._id ? (`Account Balance $${loggedIn.balance}`) : "You need to login first"}</label>
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
                  disabled={!deposit}
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
