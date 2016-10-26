import React, {
    Component,
    PropTypes
} from 'react';

import FlashMessages from '../components/FlashMessageList';
import { connect } from 'react-redux';
import { logout } from '../components/auth/actions';

// style loading
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';

import NavMain from './NavMain';

class Dashboard extends Component
{
    render() {
        return (
            <div>
                <NavMain />
                <FlashMessages/>
                {this.props.children}
            </div>
        );
    }
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired
};
//Dashboard.defaultProps = {};

export default connect(null, { logout })(Dashboard);
