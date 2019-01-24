import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <button type='button' className={props.className} onClick={()=>props.handleDelete(props.id)}>
    Delete Article
  </button>
);

export default DeleteBtn;
