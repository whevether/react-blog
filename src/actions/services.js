/**
 * Created by Administrator on 2016/12/6 0006.
 */
import * as types from '../constants/actionTypes';
import { request as request } from './admin/base';
export function requestArticle(page,pageSize)
{
    return {
        type: types.GET_ARTICLE,
        promise: request({
          url: "/api/article",
          method: "GET",
          params: {page:page,limit:pageSize}  
        })
    };
}
export function fetchArticle (page,pageSize)
{
    return (dispatch,getState)=>{
        dispatch({type:types.REQUEST_ARTICLE_DATA});
        if(getState().info.loadAll)
        {
            return dispatch(requestArticle(page,pageSize));
        }
    };
}
// 获取文章详情
export function fetchArticleContent(id)
{
    return (dispatch,getState)=>{
        dispatch({type:types.REQUEST_ARTICLE_DATA});
        if(getState().info.loadAll)
        {
            return request({
                url: `/api/article/${id}`,
                method: 'GET'
            }).then((res)=>{
                if(res.data)
                {
                    dispatch({type:types.GET_ARTICLE_DETAILS,value:res.data});
                }
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.GET_ARTICLE_FAILURE});
            });
        }
    };
}