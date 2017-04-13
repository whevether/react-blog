/**
 * Created by Administrator on 2016/11/28 0028.
 */
/*eslint-disable no-unused-vars*/
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ProtfolioActions from '../actions/protfolio';
import Protfolio from '../components/protfolio';

const mapStateToProps = (state)=>{
    return{
        protfolio:state.protfolio
    };
};
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators(ProtfolioActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Protfolio);