import React, {
    Component,
    PropTypes
} from 'react';

import { Field } from 'redux-form';
import TextFieldGroup from '../common/text-field-group';
import { login } from '../../components/auth/actions';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

export class LoginFormComponent extends Component {
    onSubmit(values){
        this.props.login(values);
    }

    render() {
        const { handleSubmit, submitting, pristine, authError } = this.props;
        return (
            <form id="login-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                { authError && <div className="alert alert-danger">{authError}</div> }
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

LoginFormComponent.propTypes = {
    login: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    authError: PropTypes.string
};
const LoginForm = reduxForm({
    form: 'login'
})(LoginFormComponent);

export default connect(
    state => ({
        authError: state.me.error
    }),
    {login}
)(LoginForm);