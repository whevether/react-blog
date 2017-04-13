/*eslint-disable no-unused-vars*/ 
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserInfoActions from '../../actions/admin/userinfo';
import AddUserInfo from '../../components/admin/adduserinfo';
const mapStateToProps = (state)=>{
    return{
        adminIndex:state.adminIndex
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(UserInfoActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(AddUserInfo);