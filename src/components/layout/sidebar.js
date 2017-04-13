/**
 * Created by Administrator on 2016/11/16 0016.
 * 侧边栏
 */
import React from 'react';
import {Link} from 'react-router';
import {Icon} from 'antd';
const Sidebar = ()=>{
  return(
        <div className="sidebar">
            <div className="sidebar-item">
                <span style={{display: "inline-block",position: "relative",left: "26%",width: "100%"}}><img src="image/1491738252740-1.jpg" alt=""/></span>
                <p>我的个人博客程序</p>
            </div>
            <nav className="sidebar-nav">
                <Link to="/home" className="sidebar-nav-item" activeClassName="active">主页<Icon type="home" style={{marginLeft:"1rem"}}/></Link>
                <Link to="/protfolio" className="sidebar-nav-item" activeClassName="active">项目经历 <Icon type="rocket" style={{marginLeft:"1rem"}}/></Link>
                <Link to="/services" className="sidebar-nav-item" activeClassName="active">文章<Icon type="message" style={{marginLeft:"1rem"}}/></Link>
                <Link to="/about" className="sidebar-nav-item" activeClassName="active">我的个人说明 <Icon type="team" style={{marginLeft:"1rem"}}/></Link>
            </nav>
            <div className="sidebar-footer">
                <p>
                    github地址 <a href="https://www.github.com/whevether">github</a>
                </p>
                <p>
                    项目演示地址 <a href="#">demo</a>
                </p>
            </div>
        </div>
  );
};
export default Sidebar;