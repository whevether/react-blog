/**
 * Created by Administrator on 2016/11/16 0016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import * as LayoutActions from '../actions/layout';
import Sidebar from '../components/layout/sidebar';
import Header from '../components/layout/header';
import Banner from '../components/layout/banner';
const App = (props)=>{
    const eventToggleSidebar = (e)=>{
        e.preventDefault();
        //动作方法
        props.toggleSidebar(!props.layout.sidebarOpen);
    };
    const style = (!props.isAuth)?{ background:"url(image/bg404.jpg)"}:{background:"url(image/bg.jpg)"};
    const wrapClass = classNames({wrap:"wrap",err:!props.isAuth});
    const layoutClass = classNames({open:props.layout.sidebarOpen});
    /*eslint-disable react/self-closing-comp*/
    return(
        <div className={layoutClass}>
            <Sidebar />
            <div className={wrapClass} style={style}>
                <Header isAuth={props.isAuth}/>
                <div className="container-fluid" >
                    {props.children}
                </div>
                 <Banner />
            </div>
            <label className="sidebar-toggle" onClick={eventToggleSidebar.bind(this)}></label>
        </div>
    );
};
App.propTypes = {
    layout:React.PropTypes.object.isRequired,
    toggleSidebar:React.PropTypes.func.isRequired,
    children:React.PropTypes.object.isRequired,
    isAuth:React.PropTypes.bool.isRequired
};
const mapStateToProps = (state)=>{
    return{
        layout:state.layout,
        isAuth:state.auth.authenticated
    };
};
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators(LayoutActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(App);