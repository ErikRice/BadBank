import { useEffect, useState } from "react";
import "../SessionData.css";

function SessionData({ ctxt }) {
  const [table, setTable] = useState([])

  useEffect (
    () => {
      let session = ctxt.map((session, id) => {
        return (
          <tr key={id}>
            <td className="bg-info">{session.name}</td>
            <td className="bg-info">{session.time}</td>
            <td className="bg-info">{session.type}</td>
            <td className="bg-info">${session.transaction}</td>
            <td className="bg-info">${session.balance}</td>
          </tr>

        );
      });
      setTable([...session]);
    },[ctxt]);

  return (
      <div>
        <div className="row d-flex justify-content-center" id="row">
          <table className="table table-bordered table-responsive m-auto">
            <thead>
              <tr>
                <th className="bg-info" scope="col">
                  Name
                </th>
                <th className="bg-info" scope="col">
                  Time
                </th>
                <th className="bg-info" scope="col">
                  Type
                </th>
                <th className="bg-info" scope="col">
                  Transaction
                </th>
                <th className="bg-info" scope="col">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
        </div>
      </div>
  )
}


export default SessionData;
