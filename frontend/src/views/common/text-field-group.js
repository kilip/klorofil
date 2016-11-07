import React from 'react';
import classNames from 'classnames';

const TextFieldGroup = ({input,label,type,meta:{touched,error,warning}}) => {
    return (
        <div className={classNames('form-group', {'has-error': touched && error},{'has-warning': touched && warning})}>
            <label htmlFor={input.name} className="control-label">
                {touched && warning && <i className="fa fa-bell-o"/>}
                {touched && error && <i className="fa fa-times-circle-o"/>}
                {label}
            </label>
            <input id={input.name} name={input.name} type={type} className="form-control" {...input}/>
            {touched && error && <div className="help-block">{error}</div> }
            {touched && warning && <div className="help-block">{warning}</div> }
        </div>
    );
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;
