import { useContext } from "react";
import { UserContext } from "./Context.js";
import "../AllData.css"

function AllData() {
  const { ctxt, setCtxt } = useContext(UserContext);

  const allUsers = async () => {
        fetch('/account/all')
          .then((response) => {
            if (response === undefined) {
              throw new Error("Users are undefined")
            }
            response.json()
          })
          .then((users) =>{
            console.log(users);
            // const allUsers = {users: [...users]};
            setCtxt(...ctxt.users, ...users);
          })
          .catch((err) => {
            console.log(err)
            alert(err);
          })
  }
 
  return (
    <div className="card text-white mb-3" style={{maxWidth: "25rem"}}>
        <div className="card-body">
          <div className="row d-flex justify-content-center text-center">
          <table className="table table-bordered table-responsive" >
            <thead>
              <tr>
                <th className="bg-info" scope="col">#</th>
                <th className="bg-info" scope="col">Name</th>
                <th className="bg-info" scope="col">Email</th>
                <th className="bg-info" scope="col">Password</th>
                <th className="bg-info" scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
             {ctxt.users.map((user, id) => {
                return (
                  <tr key={id}>
                    <th className="bg-info" scope="row">{id}</th>
                    <td className="bg-info">{user.name}</td>
                    <td className="bg-info">{user.email}</td>
                    <td className="bg-info">{user.password}</td>
                    <td className="bg-info">${user.balance}</td>
                  </tr>
              )}
            )}
            </tbody>
          </table>
          </div>
          <div>
            <button type="button" onClick={allUsers}></button>
          </div>
        </div>
      </div>
  )
};

export default AllData;
