import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Sidebar extends Component
{
    adminMenu(){
        return(
            <ul className="sidebar-menu">
                <li className="header">Admin Menu</li>
                <li>
                    <Link to="/users">User Administration</Link>
                </li>
            </ul>
        );
    }
    render(){
        const isAdmin = this.props.auth.user.isGranted('ROLE_ADMIN');
        return(
            <aside className="main-sidebar">
                <section className="sidebar" style={{height: 'auto'}}>
                    <ul className="sidebar-menu">
                        <li className="header">Main Navigation</li>
                        <li>
                            <Link to="#">
                                <i className="fa fa-calendar"/>
                                <span>Test Menu</span>
                            </Link>
                        </li>
                    </ul>
                    {isAdmin && this.adminMenu()}
                </section>
            </aside>
        );
    }
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Sidebar);