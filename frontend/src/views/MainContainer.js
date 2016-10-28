import React, {
    Component,
    PropTypes,
} from 'react';
import {Link} from 'react-router';

class MainContainer extends Component {
    render() {
        const {pageTitle,subtitle} = this.props;
        return (
            <div className="content-wrapper" style={{minHeight: '916px'}}>
                <section className="content-header">
                    <h1>
                        {pageTitle}
                        {subtitle && <small>{subtitle}</small>}
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">
                                <i className="fa fa-dashboard"/>
                                Dashboard
                            </Link>
                        </li>
                        <li className="active">
                            {pageTitle}
                        </li>
                    </ol>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        );
    }
}

MainContainer.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};
MainContainer.defaultProps = {};

export default MainContainer;
