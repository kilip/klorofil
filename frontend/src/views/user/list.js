import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';
import Box from '../common/box';
import { searchUsers } from '../../components/users/actions';
import PagerView from '../common/pager';

class ListUser extends Component {
    componentDidMount(){
        if(!this.props.pager.loaded){
            this.refreshData();
        }
    }

    refreshData(){
        const { pager } = this.props;
        var url = '/api/users';
        if(pager.links.self){
            url = pager.links.self;
        }
        this.props.searchUsers({
            url: url
        });
    }

    renderUser(index){
        const user = this.props.data[index];
        return (
            <tr key={index}>
                <td><img width="60px" className="img img-responsive" src={user.avatar} alt="user" role="presentation"/></td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>
        );
    }

    render() {
        const { pager, searchUsers, data, loading } = this.props;

        var pageToolbar = '';

        if(pager.haveToPaginate()){
            pageToolbar = (
                <PagerView
                    pager={this.props.pager}
                    loadData={searchUsers}
                />
            );
        }
        const footer = (
            <div>
                <button className="btn btn-primary">
                    <i className="fa fa-plus"/>
                    New
                </button>
                <button className="btn btn-success" onClick={this.refreshData.bind(this)}>Refresh</button>
                {pageToolbar}
            </div>
        );

        return (
            <Box
                title="Browse User"
                footer={footer}
                loading={loading}
            >
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fullname</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    {/* this.props.pager.getItems() && Object.keys(this.props.pager.getItems()).map(this.renderUser.bind(this))*/}
                    <tbody>
                        {data.length > 0 && Object.keys(data).map(this.renderUser.bind(this))}
                    </tbody>
                </table>
            </Box>
        );
    }
}

ListUser.propTypes = {
    //users: PropTypes.array.isRequired,
    //pager: PropTypes.object.isRequired,
    searchUsers: PropTypes.func.isRequired
};
ListUser.defaultProps = {

};

export default connect(
    state => ({
        pager: state.users.pager,
        data: state.users.pager.data,
        loading: state.users.pager.loading
    }),
    { searchUsers }
)(ListUser);
