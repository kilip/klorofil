import React, {
    Component,
    PropTypes,
} from 'react';
import Box from '../theme/box';
import autoBind from 'react-autobind';
import {Link} from 'react-router';
import {searchUsers} from '../../components/users/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class ListUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            page: 1
        };
        autoBind(this);
    }

    reloadUser(){
        this.setState({isLoading: true});
        this.props.searchUsers(this.state.page);
        this.setState({isLoading: false});
    }

    componentWillMount(){
        this.setState({isLoading: true});
        if(_.isEmpty(this.props.userList)){
            this.reloadUser();
        }
    }

    componentDidMount(){
        this.setState({isLoading: false});
    }

    renderUser(index){
        const user = this.props.userList.users[index];
        return (
            <tr key={index}>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>
        );
    }
    render() {
        const {isLoading } = this.state;
        const { userList } = this.props;

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
                boxTools={boxTools}
                loading={isLoading}
                footer={footers}
            >
                <table className="table">
                    <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.users && Object.keys(userList.users).map(this.renderUser)}
                    </tbody>
                </table>
            </Box>
        </div>
        );
    }
}

ListUsers.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    userList: PropTypes.object.isRequired
};

ListUsers.defaultProps = {};

export default connect(
    state => ({
        userList: state.userList
    }),
{ searchUsers })(ListUsers);
