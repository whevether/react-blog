import * as types from '../../../constants/actionTypes';
import { request as request } from '../base';
export function uploadFiles(value)
{
    return (dispatch,getState)=>{
        if(getState().auth.authenticated)
        {
            return request({
                url: `/admin/image`,
                method: 'POST',
                data: value,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res)=>{
                let data = "";
                if(res.data.msg)
                {
                    data = res.data.msg;
                }
                dispatch({type:types.UPLOAD_SUCCESS_INFO,value:data});
            }).catch((err)=>{
                Promise.reject(new Error(err));
                dispatch({type:types.UPLOAD_ERROR_INFO,value:"发生了一个错误,存在相同的文件或者上传文件不合法;"});
            });
        }
    };
}
