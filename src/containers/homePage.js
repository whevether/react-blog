/**
 * Created by Administrator on 2016/11/17 0017.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from '../components/home';
import * as homeActions from '../actions/home';

const HomePage = (props)=>{
    return(
        <Home home={props.home} actions={props.actions}/>
    );
};
const mapStateToProps = (state)=>{
  return{home:state.home};
};
const mapDispatchToProps = (dispatch)=>{
  return{
    actions:bindActionCreators(homeActions,dispatch)
  };
};
HomePage.propTypes = {
  home:React.PropTypes.object.isRequired,
  actions:React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
