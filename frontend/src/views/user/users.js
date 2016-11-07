import React, {
    Component
} from 'react';

import MainContainer from '../main-container';

class Users extends Component {
    render() {
        return (
            <MainContainer title="Manage User" subtitle="Manage Application User">
                {this.props.children}
            </MainContainer>
        );
    }
}

Users.propTypes = {};
Users.defaultProps = {};

export default Users;
