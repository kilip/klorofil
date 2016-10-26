import React, {
    Component,
    PropTypes,
} from 'react';

import { Link } from 'react-router';
import { logout } from '../components/auth/actions';
import { connect } from 'react-redux';
import {Navbar,Nav} from 'react-bootstrap';

class NavMain extends Component {
    logout(e) {
        e.preventDefault();
        this.context.router.push('/login');
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <Navbar
                staticTop
                componentClass="header"
                className="navbar navbar-default navbar-static-top"
                role="banner"
            >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">ToniDemo</Link>
                        <Navbar.Toggle/>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse className="bs-navbar-collapse">
                    <Nav role="navigation" id="top">
                        { isAuthenticated ? userLinks:guestLinks}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavMain.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

NavMain.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavMain);
