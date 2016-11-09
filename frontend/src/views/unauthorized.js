import React, {
    Component
} from 'react';

import MainContainer from './main-container';

class Unauthorized extends Component {
    render() {
        return (
            <MainContainer title="Unauthorized">
                <h1>You don't have enough access to this page</h1>
            </MainContainer>
        );
    }
}

export default Unauthorized;
