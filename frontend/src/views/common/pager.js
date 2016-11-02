import React, {
    Component,
    PropTypes,
} from 'react';

class Pager extends Component {
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
                {page} of {pages}
                <button
                    id="btnPagerPrev"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'previous')}
                    disabled={page === 1}
                >
                    <i className="fa fa-chevron-left"/>
                </button>
                <button
                    id="btnPagerNext"
                    className="btn btn-default btn-sm"
                    onClick={this.onNavClick.bind(this,'next')}
                    disabled={page === pages}
                >
                    <i className="fa fa-chevron-right"/>
                </button>
            </div>
        );
    }
}

Pager.propTypes = {
    pager: PropTypes.object.isRequired,
    loadData: PropTypes.func.isRequired
};
Pager.defaultProps = {};

export default Pager;
