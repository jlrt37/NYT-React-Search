import React from "react";
import "./msgCenter.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const msgCenter = props => (
    <div className={props.className}>{props.msg} </div>
);

export default msgCenter;
