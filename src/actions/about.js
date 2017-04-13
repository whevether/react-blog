// import axios from 'axios';
import * as types from '../constants/actionTypes';
// const ROOT_URL = `http://localhost:3000`;

export function receiveUserInfoData(data)
{
    return{
        type:types.FETCH_USER_INFO,
        value:data,
    };
}
//后台首页数据  通过token 验证api 数据权限
// export function fetchUserInfo(){
//     return (dispatch,getState)=>{
//         if(getState().about.isFetching)
//         {
//             return axios.get(`${ROOT_URL}/auth/userinfo`,{headers:{authorization:global.localStorage.getItem('token')}})
//             .then(res=>{
//                 dispatch(receiveUserInfoData(res.data));
//             });
//         }
        
//     };
// }



