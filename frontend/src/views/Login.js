import React, {
    Component,
    PropTypes
} from 'react';

import {connect} from 'react-redux';
import { addFlashMessage } from '../common/FlashMessageAction';
import { login } from '../components/auth/actions';
import LoginForm from '../components/auth/LoginForm';

class Login extends Component {
    render() {
        const {addFlashMessage,login} = this.props;
        return (
            <div className="login-box-body">
                <p className="login-box-msg">
                    Please sign in to start your session.
                </p>
                <p>
                    Default username: <b>admin</b><br/>
                    Default password: <b>admin</b>
                </p>
                <LoginForm addFlashMessage={addFlashMessage} login={login}/>
            </div>
        );
    }
}

Login.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
};
Login.defaultProps = {};

export default connect(null,{addFlashMessage,login})(Login);
