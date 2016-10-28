import React, {
    Component,
//    PropTypes,
} from 'react';

import Box from '../theme/box';
import { Link } from 'react-router'

class CreateUser extends Component {

    render() {
        var footers = (
            <div>
                <button type="button" className="btn btn-sm btn-success">
                    <i className="fa fa-floppy-o"/>
                    Save
                </button>&nbsp;
                <Link to='/users' className="btn btn-sm btn-info" role="button">
                    <i className="fa fa-step-backward"/>
                    Back
                </Link>
            </div>
        );
        return (
            <div className="row">
                <Box
                    title="Create New User"
                    theme="box-primary box-success"
                    className='col-md-12 col-sr'
                    collapsed={false}
                    loading={false}
                    footer={footers}
                >

                </Box>
            </div>
        );
    }
}

CreateUser.propTypes = {};
CreateUser.defaultProps = {};

export default CreateUser;
