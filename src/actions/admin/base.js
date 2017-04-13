import axios from 'axios';
import * as types from '../../constants/actionTypes';
const ROOT_URL = `http://localhost:3000`;
export function request({url,type,...onther})
{
    return axios({
        url:`${ROOT_URL}${url}`,
        method:type,
        ...onther
    });
}
// 初始化数据
export function initLoad(data)
{
    return{
        type:types.INIT_LOAD_DATA,
        value:data
    };
}