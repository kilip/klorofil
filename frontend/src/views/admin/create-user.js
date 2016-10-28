import React, {
    Component,
//    PropTypes,
} from 'react';

import Box from '../theme/box';

class CreateUser extends Component {

    render() {
        var footers = (
            <div>
                Test
            </div>
        );
        var boxTools = (
            <div>
                Test
            </div>
        );
        var content = (
            <div>
                We begin a content from here
            </div>
        );
        return (
            <div className="row">
                <Box
                    title="Create New User"
                    theme="box-primary box-success"
                    className='col-md-12 col-sr'
                    collapsed={false}
                    content={content}
                    boxTools={boxTools}
                    loading={false}
                    footer={footers}
                />
            </div>
        );
    }
}

CreateUser.propTypes = {};
CreateUser.defaultProps = {};

export default CreateUser;
