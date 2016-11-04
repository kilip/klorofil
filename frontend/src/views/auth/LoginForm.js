import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import { login,tokenExpired } from '../../components/auth/actions';
import { Field, reduxForm } from 'redux-form';
import TextFieldGroup from '../common/TextFieldGroup';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            submit: false,
        }
    }
    onSubmit(values){
        this.setState({submit: true});
        this.props.login(values);
        this.setState({submit:false});
    }

    componentWillUpdate(nextProps){
        if(nextProps.me.authenticated && ! nextProps.me.isTokenExpired()){
            this.context.router.push('/');
        }
    }

    render() {
        const {handleSubmit,submitting,pristine} = this.props;
        const { submit } = this.state;
        const { error } = this.props.me;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                { error && <div className="alert alert-danger">{error}</div> }
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
                <button type="submit" disabled={pristine || submitting || submit}>Login</button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    me: PropTypes.object.isRequired
};

LoginForm.contextTypes = {
    router: PropTypes.object
};

LoginForm.defaultProps = {};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);

LoginForm =  connect(state=>({
    me: state.me
}),{login,tokenExpired})(LoginForm);

export default LoginForm;