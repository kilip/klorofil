import React, {
    Component,
    PropTypes
} from 'react';

class PagerToolbar extends Component {
    onNavClick(type){
        const { pager } = this.props;
        this.props.loadData({
            url: pager.links[type]
        });
    }

    render(){
        const { page, pages } = this.props.pager;
        return (
            <div className="pull-right">
                <button
                    id="btnPagerFirst"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'first')}
                    disabled={page === 1}
                >
                    <i className="fa fa-fast-backward"/>
                </button>
                <button
                    id="btnPagerPrev"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'previous')}
                    disabled={page === 1}
                >
                    <i className="fa fa-backward"/>
                </button>
                <span>Page {page} of {pages}</span>
                <button
                    id="btnPagerNext"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'next')}
                    disabled={page === pages}
                >
                    <i className="fa fa-forward"/>
                </button>
                <button
                    id="btnPagerLast"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'last')}
                    disabled={page === pages}
                >
                    <i className="fa fa-fast-forward"/>
                </button>
            </div>
        );
    }
}

PagerToolbar.propTypes = {
    pager: PropTypes.object.isRequired,
    loadData: PropTypes.func.isRequired
};
PagerToolbar.defaultProps = {};

export default PagerToolbar;
