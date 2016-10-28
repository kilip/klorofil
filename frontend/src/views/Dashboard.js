import React, {
    Component,
    PropTypes
} from 'react';
import _ from 'lodash';

import FlashMessages from '../components/FlashMessageList';
import { connect } from 'react-redux';
import { logout } from '../components/auth/actions';
import { Link } from 'react-router';
// style loading
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/style.css';

import {replaceCssClass} from '../components/dom-utils';
import NavMain from './NavMain';
import Sidebar from './Sidebar';

class Dashboard extends Component
{

    /**
     * Returns layout for guests
     * @returns {XML}
     */
    loginLayout(){
        replaceCssClass(document.body,['hold-transition','login-page']);
        return(
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/">
                        <b>Toni</b>Demo
                    </Link>
                </div>
                {this.props.children}
            </div>
        );
    }

    /**
     * Return layout for authenticated users
     * @returns {XML}
     */
    authenticatedLayout() {
        const {logout,auth} = this.props;
        replaceCssClass(document.body,'sidebar-mini skin-blue');
        return (
            <div className="wrapper">
                <NavMain logout={logout} auth={auth} />
                <FlashMessages/>
                <Sidebar/>
                {this.props.children}
            </div>
        );
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        return isAuthenticated ? this.authenticatedLayout():this.loginLayout();
    }
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Dashboard);
