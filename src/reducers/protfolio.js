/**
 * Created by Administrator on 2016/11/28 0028.
 * 更新获取的github 数据
 */
import * as types from '../constants/actionTypes';

export default function protfolio(state={error:{},result:[],loading:'',isFetching:false},action)
{
    /*eslint-disable no-case-declarations*/
    switch (action.type)
    {
        case types.GET_GITHUB_DATA:
            return Object.assign(...state,{loading:action.loading,isFetching:true});
        case types.GET_GITHUB_DATA_SUCCESS:
            let data = [];
            if(action.list)
            {
                data = action.list.sort((a,b)=>{
                    return new Date(b.pushed_at) - new Date(a.pushed_at);
                });
            }
            return Object.assign(...state,{result:data,isFetching:false});
        case types.GET_GITHUB_DATA_FAILURE:
            return Object.assign(...state,{error:{
                status:action.error.status,
                statusText:action.error.statusText
            }});
        default:
            return state;
    }
}