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
    onClick(){
        console.log(this.props.auth.user.isGranted('ROLE_SUPER_ADMIN'));
    }

    render() {
        return (
            <div>
                <NavMain logout={logout} />
                <FlashMessages/>
                <button onClick={this.onClick.bind(this)}>Click Me</button>
                {this.props.children}
            </div>
        );
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
//Dashboard.defaultProps = {};

export default connect(mapStateToProps, { logout })(Dashboard);
