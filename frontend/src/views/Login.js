import React, {
    Component,
} from 'react';

import LoginForm from './auth/LoginForm';

class Login extends Component {
    render() {
        return (
            <div id="login-container">
                <LoginForm/>
            </div>
        );
    }
}

Login.defaultProps = {

};

export default Login;
