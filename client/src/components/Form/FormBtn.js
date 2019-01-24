import React from "react";

export const FormBtn = props => (
  <button className={props.className} {...props} style={{ float: props.float, marginBottom: 10}} >
    {props.children}
  </button>
);
