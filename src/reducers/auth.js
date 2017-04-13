/**
 * Created by keep_wan on 2016/12/29.
 */
//更新驗證狀態
import * as types from '../constants/actionTypes';

export default function authState(state={authenticated:false},action)
{
    switch (action.type)
    {
        case types.AUTH_USER:
            return Object.assign(...state,{error:'',authenticated:true,user:action.user});
        case types.UNAUTH_USER:
            return Object.assign(...state,{authenticated:false});
        case types.AUTH_ERROR:
            return Object.assign(...state,{error:action.payload});
        default:
            return state;
    }
}