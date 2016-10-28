import React, {
    Component,
    PropTypes,
} from 'react';

/**
 * Render box layout from admin-lte
 */
class Box extends Component {

    render(){
        const props = this.props;
        var boxType = '', borderClass = '', boxToolsContainer=[], loadingState, footer;
        if(props.border===true){
            borderClass = 'box-solid';
        }

        if(props.loading===true){
            loadingState =
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin"/>
                </div>
        }

        if(props.boxTools.length >0){
            boxToolsContainer = props.boxTools.map(function(object,index){
                return (
                    <button
                        type="button"
                        className="btn btn-box-tool"
                        key={index}
                        data-toggle="tooltip"
                        title={object.tooltip}
                    >
                        <i className={object.icon} onClick={object.onClick} />
                    </button>
                );
            });
        }
        if(props.collapsed===true){
            boxType = 'collapsed-box';
        }
        if(props.footer){
            footer = <div className="box-footer">{props.footer}</div>
        }
        return (
            <div className={props.className}>
                <div className={"box "+props.theme+" "+borderClass+ " color-palette-box "+boxType}>
                    <div className="box-header with-border">
                        <h3 className="box-title">{props.headerMarkup} {props.title}</h3>
                        {boxToolsContainer && <div className="box-tools pull-right">{boxToolsContainer}</div> }
                    </div>
                    <div className="box-body">
                        {props.content}
                        {props.children}
                    </div>

                    {footer}
                    {/* /.box-body */}
                    {loadingState}
                </div>
            </div>
        )
    }
}

Box.propTypes = {
    title: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    border: PropTypes.bool.isRequired,
    //content: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    boxTools: PropTypes.array
};
Box.defaultProps = {
    collapsed: false,
    theme: 'box-default',
    loading: false,
    border: false,
    width: '12',
    boxTools: []
};

export default Box;