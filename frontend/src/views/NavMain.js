import React, {
    Component,
    PropTypes,
} from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavMain extends Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.context.router.push('/login');
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;


        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>TM</b></span>
                    <span className="logo-lg"><b>Toni</b>Demo</span>
                </Link>
                <nav
                    className="navbar navbar-static-top"
                >
                    <a href="#" className="sidebar-toggle">
                        <span className="sr-only">Toggle Navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        {isAuthenticated ? userLinks : guestLinks }
                    </div>
                </nav>
            </header>
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

export default connect(mapStateToProps)(NavMain);
