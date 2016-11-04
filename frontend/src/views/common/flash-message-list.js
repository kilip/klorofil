import React, {
    Component,
    PropTypes,
} from 'react';
import { connect } from 'react-redux';
import FlashMessage from './flash-message';
import { removeFlashMessage } from '../../components/util/flash-message';

class FlashMessageList extends Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} removeFlashMessage={this.props.removeFlashMessage} />
        );
        return (
            <div>{messages}</div>
        );
    }
}

FlashMessageList.propTypes = {
    removeFlashMessage: PropTypes.func.isRequired
};
FlashMessageList.defaultProps = {};

export default connect(
    state => ({
        messages: state.flash
    }),
    {removeFlashMessage}
)(FlashMessageList);
