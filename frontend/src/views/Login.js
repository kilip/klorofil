import React, {
    Component
} from 'react';

import MainContainer,{LAYOUT_LOGIN} from './MainContainer';
import LoginForm from './auth/LoginForm';
import FlashMessageList from './common/flash-message-list';
import { login } from '../components/auth/actions';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

let LoginFormContainer = reduxForm({
    form: 'login'
})(LoginForm);
LoginFormContainer = connect(
    null,
    {login}
)(LoginFormContainer);


class Login extends Component {
    render() {
        return (
            <MainContainer layout={LAYOUT_LOGIN} title='Login'>
                <FlashMessageList/>
                <div className="callout callout-info">
                    <h4>Hello!</h4>
                    <p>You can use <b>admin</b> as username and password.</p>
                </div>
                <div className="login-box-body">
                    <LoginFormContainer/>
                </div>
            </MainContainer>
        );
    }
}

Login.defaultProps = {

};

export default Login;
