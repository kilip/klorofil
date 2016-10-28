import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../common/FlashMessageAction';
import _ from 'lodash';

export default function(ComposedComponent,requiredRoles){
    class Authenticate extends React.Component {
        isGranted(){
            return this.props.auth.user.isGranted(requiredRoles);
        }

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to login to access this page'
                });
                this.context.router.push('/login');
            }else if(!this.isGranted()){
                this.props.addFlashMessage({
                    type: 'error',
                    text: "You don't have enough permissions to access this page."
                });
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push('/login');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired,
        auth: React.PropTypes.object.isRequired
    };

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            auth: state.auth
        };
    }

    return connect(mapStateToProps, { addFlashMessage})(Authenticate);
}