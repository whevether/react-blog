/**
 * Created by Administrator on 2016/12/29 0029.
 * 登入组件
 */
import React,{Component} from 'react';
import {reduxForm,Field,} from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col,Row,Alert} from 'antd';
import classNames from 'classnames';
import * as authActions from '../../actions/auth';
//redux-form 验证输入合法性
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = '不能为空';
    } else if (values.name.length > 15) {
        errors.name = '昵称不能大于15个字符';
    }
    if (!values.email) {
        errors.email = '不能为空';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '邮箱不合法';
    }
    if (!values.password) {
        errors.password = '不能为空';
    } else if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[a-zA-Z\d\W]{8,}$/.test(values.password)) {
        errors.password = '密码强度不够。最少包含一个大写字符。一个特殊字符，一个数字，一个英文的八位密码';
    }

    return errors;
};

class Signin extends Component
{
    constructor(props)
    {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderField = this.renderField.bind(this);
    }
//    提交表单处理到服务端
    handleFormSubmit({email,password})
    {
        this.props.signinUser({email,password});
    }
//    提示消息
    renderAlert()
    {
       
        const onClose = (e)=>{
            e.preventDefault();
        };
        if(this.props.errorMessage)
        {
            return(
               <div>
                    <Alert message="发生一个错误!!!!"
                        description= {this.props.errorMessage}
                        type="error"
                        closable
                        onClose={onClose}
                    />
                </div>
            );
        }
    }
//    渲染表单字段 input 表单值，label 标签 type 属性。 meta:触摸事件  是redux-form 封装好的s
    renderField({ input, label, type, meta: { touched, error, warning }})
    {
        /*eslint-disable react/self-closing-comp*/
        const anticon = classNames({anticon:"anticon","anticon-user":type==='email',"anticon-lock":type==="password"});
        return(
          <div className="ant-row ant-form-item">
                <div className="ant-form-item-control">
                    <span className="ant-input-preSuffix-wrapper">
                        <span className="ant-input-prefix">
                            <i className={anticon}></i>
                        </span>
                        <input {...input} type={type} placeholder={label} className="ant-input ant-input-lg"/>
                    </span>
                    {touched && ((error && <em style={{color:'red'}}>{error}</em>) || (warning && <em style={{color:'red'}}>{warning}</em>))}
                </div>
          </div>
        );
    }
    render()
    {
        //redux-form 事件
        const {handleSubmit,pristine,reset,submitting} = this.props;
        return(
            <Row>
                <Col span={8} push={8}>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)} className="ant-form ant-form-horizontal" id="signin">
                        <Field component={this.renderField} name="email" type="email" />
                        <Field component={this.renderField} name="password" type="password" />
                        {this.renderAlert()}
                        <div className="ant-row ant-form-item">
                            <div className="ant-form-item-control-wrapper">
                                <button className="ant-btn ant-btn-primary" type="submit" disabled={submitting} style={{marginRight:"1rem"}}>登入</button>
                                <button className="ant-btn" type="button" disabled={pristine || submitting} onClick={reset} style={{marginLeft:"1rem"}}>取消</button>
                            </div>
                        </div>
                    </form>
                </Col>
           </Row>
        );
    }
}
const mapStateToProps = (state)=>{
  return {errorMessage:state.auth.error,isAuth:state.auth.authenticated};
};
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators(authActions,dispatch);
};
Signin.propTypes ={
    signinUser:React.PropTypes.func.isRequired,
    handleSubmit:React.PropTypes.func.isRequired,
    pristine:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    errorMessage:React.PropTypes.string,
    isAuth:React.PropTypes.bool
};
/*eslint-disable no-class-assign*/
Signin =  reduxForm({
    form: 'signin',
    validate
})(Signin);
export default connect(mapStateToProps,mapDispatchToProps)(Signin);