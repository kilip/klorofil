import React, {
    Component,
} from 'react';

class Unauthorized extends Component {
    render() {
        return (
            <div>
                <h1>You don't have enough access to this page</h1>
            </div>
        );
    }
}

export default Unauthorized;
