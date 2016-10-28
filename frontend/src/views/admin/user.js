import React, {
    Component,
//    PropTypes,
} from 'react';

import MainContainer from '../MainContainer';

class User extends Component {
    render() {
        return (
            <MainContainer pageTitle="User Administration" subtitle="Manage all user in application">
                {this.props.children}
            </MainContainer>
        );
    }
}

User.propTypes = {};
User.defaultProps = {};

export default User;
