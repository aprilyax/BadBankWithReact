import React from "react";

function Card(props) {

  return (
    <div className={props.className} style={{ maxWidth: props.maxWidth }}>
      <div className="card-header brand-background">{props.header}</div>
      <div className="card-body">
        {props.title && <h3 className="card-title">{props.title}</h3>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && props.successFlag ? <div style={{color:'#019e02'}} id="createStatus"><br />{props.status}</div>:<div style={{color:'red'}} id="createStatus"><br />{props.status}</div>}
      </div>
    </div>
  );
}

export default Card 
