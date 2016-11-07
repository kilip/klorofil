import React, {
    Component,
    PropTypes
} from 'react';

import { Field } from 'redux-form';
import TextFieldGroup from '../common/TextFieldGroup';

class LoginForm extends Component {
    onSubmit(values){
        this.props.login(values);
    }

    render() {
        const { handleSubmit,submitting,pristine} = this.props;
        //const { error } = this.props.me;
        return (
            <form id="login-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {/* error && <div className="alert alert-danger">{error}</div> */}
                <Field
                    name="username"
                    label="Username"
                    component={TextFieldGroup}
                />
                <Field
                    name="password"
                    label="Password"
                    type="password"
                    component={TextFieldGroup}
                />
                <button id="login" type="submit" disabled={pristine || submitting}>Login</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;