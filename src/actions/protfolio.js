/**
 * Created by Administrator on 2016/11/28 0028.
 * 请求github 数据
 */
import * as types from '../constants/actionTypes';
import request from 'axios';

//获取github 数据
export  function getGithubRepos()
{
    return (dispatch)=>{
        const url = `https://api.github.com/users/whevether/repos`;
        let dataList = [];
        dispatch({
           type:types.GET_GITHUB_DATA,
            loading:"请求"
        });
        request.get(`${url}`).then((res)=>{
            dataList = res.data;
            if(dataList)
            {
                dispatch({
                   type:types.GET_GITHUB_DATA_SUCCESS,
                    list:dataList,
                    loading:"成功"
                });
            }
        }).catch((err)=>{
            /*eslint-disable no-console*/
            console.error(err);
            dispatch({
                tpye:types.GET_GITHUB_DATA_FAILURE,
                loading:err
            });
        });
    };
}
