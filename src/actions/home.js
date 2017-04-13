/**
 * Created by Administrator on 2016/11/17 0017.
 * 主页动作  使用axios 异步获取图片数据
 */
import * as actionTypes from '../constants/actionTypes';
import { request as request } from './admin/base';
export function requestImg(page,pageSize)
{

    return{
      type:actionTypes.REQUEST_IMAGE,
        promise:request({
            url: '/admin/image',
            method: 'GET',
            params: {page:page,limit:pageSize}
        })
    };
}
// 获取服务端api 图片信息   getState  获取状态
export function fetchImageData(page,pageSize)
{
   
    return(dispatch,getState)=>{
      dispatch({type:actionTypes.REQUEST_IMAGE_REQUEST});
      if(getState().home.loadeAll)
      {
          return dispatch(requestImg(page,pageSize));
      }
    };
}
// 获取分页数据
// export function fetchImageLimit (page,limit)
// {
//     return (dispatch,getState) => {
//         dispatch({type:actionTypes.REQUEST_IMAGE_REQUEST});
//         if(getState().home.loadeAll)
//         {
//             return dispatch({type:"FETCH_IMAGE_LIMIT_DATA",
//                 promise: request({
//                     url: '/admin/photos',
//                     method: 'GET',
//                     params: {page:page,limit:limit}
//                 })});
//         }
//     };
// }