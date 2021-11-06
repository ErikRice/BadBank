import { useContext } from "react";
import { UserContext } from "./Context.js";
import "../AllData.css"

function AllData() {
  const { ctxt } = useContext(UserContext);

  let usersList = ctxt.users;
 
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
              {usersList.map((user, i) => (
                <tr key={i}>
                  <th className="bg-info" scope="row">{i}</th>
                  <td className="bg-info">{user.name}</td>
                  <td className="bg-info">{user.email}</td>
                  <td className="bg-info">{user.password}</td>
                  <td className="bg-info">${user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
  )
};

export default AllData;
