import * as types from '../constants/actionTypes';
const initialState = {
    data: null,
    isFetching: true
};
// 个人说明api 数据   必须token 登入后才会显示
export default function aboutState(state=initialState,action)
{
    /*eslint-disable no-case-declarations*/
    switch(action.type)
    {      
        case types.FETCH_USER_INFO:
            let data = {};
            if(action.value !== undefined)
            {
                data = action.value;
            }
            return Object.assign({},state,{data:data,isFetching:false});
        default:
            return state;
    }
}