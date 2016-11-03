import React, {
    Component,
    PropTypes,
} from 'react';
import NavMain from './NavMain';
import Sidebar from './Sidebar';
import { Link } from 'react-router';
import { replaceCssClass } from './utils/dom';
import { connect } from 'react-redux';
import { removeFlashMessage } from '../components/util/flash-message';
import FlashMessageList from './common/flash-message-list';

export const LAYOUT_LOGIN   = 'layout.login';
export const LAYOUT_DEFAULT = 'layout.default';

class MainContainer extends Component {

    loginLayout(){
        replaceCssClass(document.body,'hold-transition login-page');
        return (
            <div className="login-box">
                <div className="login-logo">
                    <b>klo</b>ro<b>fil</b>
                </div>
                {this.props.children}
            </div>
        );
    }

    dashboardLayout(){
        const { title, subtitle, removeFlashMessage } = this.props;
        replaceCssClass(document.body,'sidebar-mini skin-blue');
        document.title = this.props.title + ' | Klorofil Demo';
        return (
            <div className="wrapper">
                <NavMain
                />
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            {title}
                            <small>{subtitle}</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/">
                                    <i className="fa fa-home"/>
                                    Dashboard
                                </Link>
                            </li>
                        </ol>
                    </section>
                    <section className="content">
                        <FlashMessageList removeFlashMessage={removeFlashMessage}/>
                        {this.props.children}
                    </section>
                </div>
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> 1.0.0
                    </div>
                    <strong>This project is created by <a href="http://itstoni.com">Anthonius Munthi</a>.</strong>
                </footer>
            </div>
        );
    }

    render() {
        return this.props.layout === LAYOUT_LOGIN ? this.loginLayout():this.dashboardLayout();
    }
}

MainContainer.propTypes = {
    layout: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    removeFlashMessage: PropTypes.func.isRequired
};

MainContainer.defaultProps = {
    layout: LAYOUT_DEFAULT
};

export default connect(null,{removeFlashMessage})(MainContainer);
