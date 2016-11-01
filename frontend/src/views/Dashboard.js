import React, {
    Component,
    PropTypes,
} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import { Link } from 'react-router';
class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Link to="/">Dashboard</Link>
                <Link to="/users">User List</Link>
                {this.props.children}
            </div>
        );
    }
}

Dashboard.propTypes = {

};
Dashboard.defaultProps = {

};

export default Dashboard;
