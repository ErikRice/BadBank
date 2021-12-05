import Card from "./Card.js";
import Bank from "../bank.png";

function Home() {
  return (
    <div className="text-center">
      <Card
        bgcolor="primary"
        header="Bad Bank"
        title={"Welcome!"}
        text={"Start By Creating an Account or Logging In"}
        body={
          <img
            src={Bank}
            className="img-fluid"
            alt="Bank Building"
            width="150" 
            height="150" 
          />
        }
      />
    </div>
  );
}

export default Home;
