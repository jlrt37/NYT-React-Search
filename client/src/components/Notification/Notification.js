import React from "react";
import "./Notification.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Notification = props => (
        props.notification.slice(-5).map((item,i) => {
            return (
                <div key={i} className='notification-card card border-info mb-3'>
                    <div className='card-body'>
                        {item}
                    </div>
                </div>
            )
        })    
);

export default Notification;
