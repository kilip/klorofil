import React, {
    Component,
//    PropTypes,
} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';
import './assets/style.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-wrapper wrapper">
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
