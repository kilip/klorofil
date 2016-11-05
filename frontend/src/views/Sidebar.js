import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

export class Sidebar extends Component
{
    adminMenu(){
        return(
            <ul id="sidebarAdminMenu" className="sidebar-menu">
                <li className="header">Admin Menu</li>
                <li>
                    <Link to="/users">
                        <i className="fa fa-users"/>
                        <span>User Administration</span>
                    </Link>
                </li>
            </ul>
        );
    }

    render(){
        const isAdmin = this.props.me.isGranted('ROLE_ADMIN');
        return(
            <aside className="main-sidebar">
                <section className="sidebar" style={{height: 'auto'}}>
                    <ul className="sidebar-menu">
                        <li className="header">Main Navigation</li>
                        <li>
                            <Link to="/" activeClassName="active">
                                <i className="fa fa-home"/>
                                <span>Dashboard</span>
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

};

function mapStateToProps(state) {
    return {
        me: state.me
    };
}

Sidebar = connect(mapStateToProps)(Sidebar);

export default Sidebar;