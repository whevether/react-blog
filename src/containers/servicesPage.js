/**
 * Created by Administrator on 2016/12/6 0006.
 */
/*eslint-disable no-unused-vars*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Services from '../components/services';
import * as ServicesActions from '../actions/services';
const mapStateToProps = (state)=>{
  return{
    info:state.info
  };
};
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators(ServicesActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Services);