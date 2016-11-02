import React, {
    Component,
    PropTypes,
} from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../components/auth/actions';
class NavMain extends Component {
    pushMenu(){
        var body = document.body;
        if(body.clientWidth > 768){
            if(body.className.indexOf('sidebar-collapse') === -1){
                body.className += ' sidebar-collapse';
            }else {
                body.className = body.className.replace(' sidebar-collapse', '');
            }
        }else{
            if (body.className.indexOf('sidebar-open') === -1) {
                body.className += ' sidebar-open';
            }else{
                body.className = body.className.replace(' sidebar-open','');
            }
        }
    }
    render() {


        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>kl</b></span>
                    <span className="logo-lg"><b>klorofil</b></span>
                </Link>
                <nav
                    className="navbar navbar-static-top"
                    role="navigation"
                >
                    {/* Sidebar toggle button*/}
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={this.pushMenu.bind(this)}>
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">

                    </div>
                </nav>
            </header>
        );
    }
}

NavMain.propTypes = {
    logout: PropTypes.func.isRequired,

};
NavMain.defaultProps = {};

export default connect(
    state => ({
        me: state.me
    }),
    {logout}
)(NavMain);
