/**
 * Created by Administrator on 2016/12/29 0029.
 */
//验证登入和注册action
import axios from 'axios';
import jwt from 'jwt-simple';
import {browserHistory} from 'react-router';
import * as types from '../constants/actionTypes';
//后台地址
const ROOT_URL = `http://localhost:3000`;
//tosken
export function signinSuccess(token) {
    //保存token
    localStorage.setItem('token',token);
    //解码token 里面的用户名
    const username = jwt.decode(token,"F8F98S02KKV8S900CJSIIIG032098VFIISIJJJ").user;
    return{
        type:types.AUTH_USER,
        user:username
    };
}
//登入action
export function signinUser ({email,password}){
    return (dispatch)=>{
        axios.post(`${ROOT_URL}/auth/signin`,{email,password})
            .then(res=>{
              // 更新reducers
              dispatch(signinSuccess(res.data.token));
                //    跳转组件
                window.location.href = `/admin`;

            }).catch((err)=>{
                /* eslint-disable no-console */
                console.log(err);
                dispatch(authError('密码不正确'));
        });
    };
}
//注册
export function signupUser ({email,password,username}){
    return (dispatch)=>{
      axios.post(`${ROOT_URL}/auth/signup`,{email,password,username})
          .then(res=>{
              // 更新reducers
              dispatch(signinSuccess(res.data.token));
              browserHistory.push('/admin');
          }).catch((err)=>{
              /* eslint-disable no-console */
              console.log(err);
            dispatch(authError("你输入的邮箱已经被注册"));
      });
    };
}
//错误消息
export function authError  (error){
  return {
        type:types.AUTH_ERROR,
        payload:error
    };
}
//登出/注销s
export function signoutUser (){
  localStorage.removeItem('token');
    return {type:types.UNAUTH_USER};
}
