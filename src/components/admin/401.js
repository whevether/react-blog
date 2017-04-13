/**
 * Created by Administrator on 2016/11/16 0016.
 */
import React from 'react';
import {Link} from 'react-router';
const Error401 = ()=>{
    return(
          <div className="page">
              <p className="page-title">登入错误,没有权限访问页面</p>
             <div><Link to="/home" className="ant-btn ant-btn-primary"><span>返回首页</span></Link></div>
          </div>
    );
};
export default Error401;