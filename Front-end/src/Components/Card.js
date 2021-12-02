import "../Card.css";

const Card = (props) => {

  return (
    <div className="card d-block text-black" id="card" >
      {props.header && <div className="card-header px-0">{props.header}</div>}
      <div className="card-body">
        {props.title && <h4 className="card-title">{props.title}</h4>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
};

export default Card;
