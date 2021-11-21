import Card from './Card.js';
import Bank from '../bank.png';

function Home() {
  return (
    <div className="text-center">
      <Card
        bgcolor="primary"
        header="Bad Bank"
        title="Welcome!"
        text="Start By Creating an Account"
        body={<img src={Bank} className="img-fluid" alt="Bank Building" style={{width:'60', height:'70'}}/>}
      />
    </div>
  );
};

export default Home;
