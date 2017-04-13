import {browserHistory} from 'react-router';
import * as types from '../../../constants/actionTypes';
import { request as request } from '../base';// eslint-disable import/no-duplicates
import {fetchCategory} from '../category/category';
// 创建文章
export function createArticle(value)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/article/create`,
                method: 'POST',
                data: value
            })
            .then((res)=>{
                dispatch({type:types.ARTICLE_CREATE,value:res.data.msg});
            }).catch((err)=>{
                dispatch({type:types.ARTICLE_ERROR,value:"创建文章错误，已经存在的文章或者输入不合法"});
                Promise.reject(new Error(err));

            });
        }
    };
}
// 编辑文章
export function editArticle(value,urls)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/article/edit/${urls}`,
                method: 'POST',
                data: value
            })
            .then((res)=>{
                dispatch({type:types.ARTICLE_EDIT,value:res.data.msg});
                browserHistory.push('/admin/article');
            }).catch((err)=>{
                dispatch({type:types.ARTICLE_ERROR,value:"创建文章错误，已经存在的文章或者输入不合法"});
                Promise.reject(new Error(err));
            });
        }
    };
}
// 删除文章
export function deleteArticle(urls)
{
    return(dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url:`/admin/article/delete/${urls}`,
                method:'DELETE'
            }).then((res)=>{
                dispatch({type:types.DELETE_ARTICLE,value:res.data.msg});
                browserHistory.push('/admin/article');
            }).catch((err)=>{
                    Promise.reject(new Error(err));
                    dispatch({type:types.CATEGORY_ERROR,value:"删除错误"});
            });
        }
    };
}
// 获取文章列表
export function fetchArticle()
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/article`,
                method: 'GET',
                headers:{authorization:global.localStorage.getItem('token')}
            })
            .then((res)=>{
                if(res.data.article)
                {
                    dispatch({type:types.FETCH_ARTICLE,value:res.data.article});
                }
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.ARTICLE_ERROR,value:"你获取的信息错误"});
            });
        }
    };
}
// 获取文章类型到select 控件内
export {fetchCategory as fetchCategory};