import React, {
    Component,
    PropTypes
} from 'react';

import classnames from 'classnames';

class Box extends Component {
    render() {
        const { theme,title,footer,loading } = this.props;
        var
            boxTheme = 'box-'+theme,
            loadingState = ''
        ;
        if(loading){
            loadingState =
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin"/>
                </div>
        }
        return (
            <div className={classnames('box',boxTheme)}>
                <div className="box-header with-border">
                    <h3 className="box-title">{title}</h3>
                </div>
                <div className="box-body">
                    {this.props.children}
                </div>
                <div className="box-footer">
                    {footer}

                    {loadingState}
                </div>
            </div>
        );
    }
}

Box.propTypes = {
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    footer: PropTypes.object,
    loading: PropTypes.bool.isRequired
};
Box.defaultProps = {
    theme: 'primary',
    loading: false
};

export default Box;
