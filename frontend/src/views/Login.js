import React, {
    Component,
} from 'react';

import MainContainer,{LAYOUT_LOGIN} from './MainContainer';
import LoginForm from './auth/LoginForm';

class Login extends Component {
    render() {
        return (
            <MainContainer layout={LAYOUT_LOGIN} title='Login'>
                <div className="callout callout-info">
                    <h4>Hello!</h4>
                    <p>You can use <b>admin</b> as username and password.</p>
                </div>
                <div className="login-box-body">
                    <LoginForm/>
                </div>
            </MainContainer>
        );
    }
}

Login.defaultProps = {

};

export default Login;
