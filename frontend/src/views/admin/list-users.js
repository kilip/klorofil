import React, {
    Component,
    PropTypes,
} from 'react';
import Box from '../theme/box';
import autoBind from 'react-autobind';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { listUsers } from '../../components/users/data';

class ListUsers extends Component {

    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            isLoading: false
        };
    }

    reloadUser(){
        console.log('reload')
        this.setState({isLoading: true});
        this.props.listUsers().then(
            () => {},
            (err) => {}
        );
        this.setState({isLoading: false});
    }

    render() {
        const {isLoading} = this.state;
        const content = (
            <h4>Hello World</h4>
        );

        var boxTools = [
            {
                icon: 'fa fa-refresh',
                onClick: this.reloadUser,
                tooltip: 'Refresh user data'
            }
        ];

        var footers = (
            <Link to="/users/create" className="btn btn-sm btn-success">
                <i className="fa fa-plus-square"/>
                &nbsp;New User
            </Link>
        );

        return (
        <div className="row">
            <Box
                title="List Users"
                theme="box-primary box-success"
                className='col-md-12 col-sr'
                collapsed={false}
                content={content}
                boxTools={boxTools}
                loading={isLoading}
                footer={footers}
            />
        </div>
        );
    }
}

ListUsers.propTypes = {
    listUsers: PropTypes.func.isRequired
};
ListUsers.defaultProps = {};

export default connect(null,{listUsers})(ListUsers);
