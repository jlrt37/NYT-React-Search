import React from "react";

export const DropDownList = props => (
    <div className="form-group">
        <select onChange={props.onChange} name={props.name} defaultValue={props.value} value={props.numArticle} className="form-control" >
            {props.li.map(item => 
                <option key={item} value={item}>{item}</option>
            )}
        </select>
    </div>
);
