// 提交用户信息
import * as types from '../../constants/actionTypes';
import {reset} from 'redux-form';
import {browserHistory} from 'react-router';
/*eslint-disable import/no-duplicates*/
import { request as request } from './base';
import { initLoad } from './base';
// 获取用户数据
export function fetchUserInfo()
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/index`,
                method: 'GET',
                headers:{authorization:global.localStorage.getItem('token')}
            })
            .then((res)=>{
                dispatch({type:types.FETCH_USER_INFO,value:res.data.user});
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.USER_INFO_ERROR,value:"你获取的信息错误"});
            });
        }
    };
}
export function submitUserInfo(value)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/index/adduserinfo`,
                method:'POST',
                data:value
            })
            .then((res)=>{
                dispatch({type:types.POST_USER_INFO,value:res.data.msg});
                dispatch(reset('adduserinfo'));
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.USER_INFO_ERROR,value:"你输入的名字已经存在了.请确认"});
            });
        }
    };
}
// 初始化数据
export {initLoad as initLoad};
// 编辑用户信息
export function editUserInfo(urls,value)
{
    return(dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/index/edituserinfo/${urls}`,
                method: 'POST',
                data: value
            })
            .then((res)=>{
                dispatch({type:types.EDIT_USER_INFO,value:res.data.msg});
                browserHistory.push('/admin');
            }).catch((err)=>{
                    Promise.reject(new Error(err));
                    dispatch({type:types.USER_INFO_ERROR,value:"输入的信息有误"});
            });
        }
    };
}
// 删除用户信息
export function deleteUserInfo(urls)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/index/deleteuserinfo/${urls}`,
                method: 'delete'
            })
            .then((res)=>{
                dispatch({type:types.DELETE_USER_INFO,value:res.data.msg});
                browserHistory.push('/admin');
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.USER_INFO_ERROR,value:"删除失败"});
            });
        }
    };
}