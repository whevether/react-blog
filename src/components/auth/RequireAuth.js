/**
 * Created by Administrator on 2016/12/29 0029.
 验证后台组件是否有访问权限
 */
import React from 'react';
import {connect} from 'react-redux';
export default function (ComposedComponents)
{
    class Authentication extends React.Component
    {
        constructor(props)
        {
            super(props);
        }

    //   验证前获取状态
        componentDidMount()
        {
            //如果不为真跳回首页
            if(!this.props.authenticated)
            {
                window.location.href = `/401Page`;
            }
        }

    //    更新验证状态
        componentWillUpdate(nextProps)
        {

            if(!nextProps.authenticated)
            {
                window.location.href = `/401Page`;
            }
        }
        //渲染通过验证的组件
        render()
        {

            return (<div>{(this.props.authenticated === true)?<ComposedComponents {...this.props}/>:null}</div>);
        }
    }
    const mapStateToProps = (state)=>{
        return {authenticated:state.auth.authenticated};
    };
    Authentication.propTypes = {
        authenticated:React.PropTypes.bool.isRequired,
    };
    return connect(mapStateToProps)(Authentication);
}