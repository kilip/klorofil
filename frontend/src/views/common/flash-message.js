import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';

class FlashMessage extends Component {
    onClick() {
        this.props.removeFlashMessage(this.props.message.id);
    }

    render() {
        const { id, type, text } = this.props.message;
        return (
            <div className={classNames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
            })}>
                <button id={'btnFlashRemove-'+id} onClick={this.onClick.bind(this)} className="close"><span>&times;</span></button>
                {text}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    removeFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
