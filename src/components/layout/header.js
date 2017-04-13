/**
 * Created by Administrator on 2016/11/17 0017.
 */
import React from 'react';
import {Link} from 'react-router';
import {Button} from 'antd';
const Header = (props)=>{
    const gotoAdmin = (e)=>{
        e.preventDefault();
        window.location.href = `/admin`;
    };
    /*eslint-disable react/self-closing-comp*/
    return(
       <div className="masthead">
           <h3 className="masthead-title">
               <Link to="/" title="主页">我的博客</Link>
           </h3>
           <ul className="signin" role="tablist">
               <li role="presentation" className="active">
                   {(!props.isAuth)?<Link to="/signin" className="ant-btn ant-btn-primary" ><i className="anticon anticon-user"></i><span>登入</span></Link>:<Button type="primary" icon="user" onClick={gotoAdmin.bind(this)}>到后台</Button>}
                </li>
           </ul>
       </div>
    );
};
Header.propTypes = {
    isAuth:React.PropTypes.bool
};
export default Header;