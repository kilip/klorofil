import React, {
    Component,
    PropTypes,
} from 'react';

class MainContainer extends Component {
    render() {
        const {pageTitle} = this.props;
        return (
            <div className="content-wrapper" style={{minHeight: '916px'}}>
                <section className="content-header">
                    <h1>{pageTitle}</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/">
                                <i className="fa fa-dashboard"/>
                                Dashboard
                            </a>
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
    pageTitle: PropTypes.string.isRequired
};
MainContainer.defaultProps = {};

export default MainContainer;
