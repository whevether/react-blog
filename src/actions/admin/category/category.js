// 文章类型
import * as types from '../../../constants/actionTypes';
import {reset} from 'redux-form';
import {browserHistory} from 'react-router';
/*eslint-disable import/no-duplicates*/
import { request as request } from '../base';
import { initLoad } from '../base';
//添加类型
export function submitCategoryCreate(value)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/category/create`,
                method:'POST',
                data:value
            }).then((res)=>{
                dispatch({type:types.CATEGORY_CREATE,value:res.data.msg});
                dispatch(reset('createCategory'));
            }).catch((err)=>{
                dispatch({type:types.CATEGORY_ERROR,value:"创建分类错误，已经存在的分类或者输入不合法"});
                Promise.reject(new Error(err));  
            });
        }
    };
}
// 编辑文章类型
export function submitCategoryEdit(urls,value)
{
    return(dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/category/edit/${urls}`,
                method:'POST',
                data:value
            }).then((res)=>{
                dispatch({type:types.EDIT_CATEGORY,value:res.data.msg});
                browserHistory.push('/admin/category');
            }).catch((err)=>{
                    Promise.reject(new Error(err));
                    dispatch({type:types.CATEGORY_ERROR,value:"输入的信息有误"});
            });
        }
    };
}
export function deleteCategory(urls)
{
    return(dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/category/delete/${urls}`,
                method:'DELETE'
            }).then((res)=>{
                dispatch({type:types.DELETE_CATEGOEY,value:res.data.msg});
                browserHistory.push('/admin/category');
            }).catch((err)=>{
                    Promise.reject(new Error(err));
                    dispatch({type:types.CATEGORY_ERROR,value:"删除错误"});
            });
        }
    };
}
// 获取所有文章类型
export function fetchCategory()
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/category`,
                method:'GET',
                headers:{authorization:global.localStorage.getItem('token')}
            }).then((res)=>{
                dispatch({type:types.FETCH_CATEGORY,value:res.data.category});
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.CATEGORY_ERROR,value:"你获取的信息错误"});
            });
        }
    };
}
export {initLoad as initLoad };