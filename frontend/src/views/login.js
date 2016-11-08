import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import MainContainer,{LAYOUT_LOGIN} from './main-container';
import LoginForm from './auth/login-form';
import {login as doLogin} from '../components/auth/actions';
import FlashMessageList from './common/flash-message-list';

export class Login extends Component {
    render() {
        const { doLogin } = this.props;
        return (
            <MainContainer layout={LAYOUT_LOGIN} title='Login'>
                <FlashMessageList/>
                <div className="callout callout-info">
                    <h4>Hello!</h4>
                    <p>You can use <b>admin</b> as username and password.</p>
                </div>
                <div className="login-box-body">
                    <LoginForm doLogin={doLogin}/>
                </div>
            </MainContainer>
        );
    }
}

Login.propTypes = {
    doLogin: PropTypes.func.isRequired
};

export default connect(
    state => ({
    }),
    {doLogin}
)(Login);