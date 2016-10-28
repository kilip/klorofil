import React, {
    Component,
    PropTypes,
} from 'react';

import { Field,reduxForm} from 'redux-form';
import TextFieldGroup from '../../common/TextFieldGroup';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {login} from '../auth/actions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    onSubmit(values){
        this.props.login(values);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.context.router.push('/');
        }
    }
    render() {
        const {handleSubmit,pristine,submitting,error} = this.props;
        const authError = this.props.auth.errors;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                { error && <div className="alert alert-danger">{error}</div> }
                { authError && <div className="alert alert-danger">{authError._error}</div> }
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
                <button type="submit" disabled={pristine||submitting}>Login</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default connect(state=>({
    auth: state.auth,
}),{login})(LoginForm);
