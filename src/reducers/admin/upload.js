import * as types from '../../constants/actionTypes';
const initState = {
    msg: ""
};
// 上传文件
export default function(state=initState,action)
{
    switch(action.type)
    {
        case types.UPLOAD_SUCCESS_INFO:
            return Object.assign(...state,{msg:action.value});
        case types.UPLOAD_ERROR_INFO:
            return Object.assign(...state,{msg:action.value});
        default:
            return state;
    }
}