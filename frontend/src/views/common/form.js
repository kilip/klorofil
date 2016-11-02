import React from 'react';

export const TextFieldGroup = ({input,label,type,meta:{touched,error,warning}}) => {
    return (
        <div className="form-group">
            <label htmlFor={input.name} className="control-label">
                {label}
            </label>
            <input id={input.name} name={input.name} type={type} className="form-control" {...input}/>
        </div>
    );
};

TextFieldGroup.defaultProps = {
    type: 'text'
};
