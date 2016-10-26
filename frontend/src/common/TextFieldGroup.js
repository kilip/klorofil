import React from 'react';
import classNames from 'classnames';

const TextFieldGroup =({ input, label,type,meta:{touched,error,warning} }) => {
    const isError = touched && error;
    return (
        <div className={classNames('form-group',(isError && 'has-error'))}>
            <label className="control-label" htmlFor={input.name}>{label}</label>
            <input {...input} type={type} className="form-control"/>
            {touched && isError && <span className="help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.defaultProps = {
    text: 'text'
};

export default TextFieldGroup;
