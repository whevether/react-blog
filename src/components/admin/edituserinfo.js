/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {reduxForm,Field} from 'redux-form';
import {Row, Col,Button,notification} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserInfoActions from '../../actions/admin/userinfo';
import _ from 'lodash';
// 验证输入合法性

class Edit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleSubmitUserInfo = this.handleSubmitUserInfo.bind(this);
    
    }
    componentWillMount()
    {
        let data = _.find(this.props.adminIndex.data,this.props.params);
        this.props.initLoad(data);
    }
    
    // 提交信息事件
    handleSubmitUserInfo({username,age,sex,hobby,specialty,occupation})
    {
        let url = this.props.params.id;
        this.props.editUserInfo(url,{username,age,sex,hobby,specialty,occupation})
        .then(()=>{
            if(this.props.adminIndex.msg.length !== 0)
            {
                notification.open({
                    message:  this.props.adminIndex.msg,
                    description: this.props.adminIndex.msg,
                });
            }
        });
    }
    
    // 渲染表单字段
    renderField({input,label,type, meta: { touched, error } })
    {
        return(
            <div className="ant-row ant-form-item">
                <Col lg={3} className="ant-form-item-label">
                    <label className="ant-form-item-required">
                        {label}
                    </label>
                </Col>
                <Col lg={5} className="ant-form-item-control">
                    <input {...input} type={type} placeholder={label} className="ant-input ant-input-lg" />
                     {touched && error && <span>{error}</span>}
                </Col>
            </div>
        );
    }
  
    render()
    {
        
        const {handleSubmit,pristine,reset,submitting} = this.props;
        return(
            <Row>
                <form onSubmit={handleSubmit(this.handleSubmitUserInfo)} className="ant-form" id="userinfo">
                    <Field component={this.renderField} name="username" type="text" label="姓名" />
                    <Field component={this.renderField} name="age" type="number" label="年龄"/>
                    <div className="ant-row ant-form-item">
                        <Col lg={3} className="ant-form-item-label">
                            <label className="ant-form-item-required">
                                性别
                            </label>
                        </Col>
                        <Col lg={5} className="ant-form-item-control">
                            <label className="form-radio"><Field name="sex" component="input" type="radio" value="男" className="ant-input ant-input-lg"/>男</label>
                            <label className="form-radio"><Field name="sex" component="input" type="radio" value="女" className="ant-input ant-input-lg"/>女</label>
                        </Col>
                    </div>
                    <Field component={this.renderField} name="hobby" type="text" label="业余爱好"/>
                    <Field component={this.renderField} name="specialty" type="text" label="特长"/>
                    <Field component={this.renderField} name="occupation" type="text" label="职业"/>
                    <div className="ant-row ant-form-item">
                        <Col lg={{span:5,offset:3}}>
                            <Button type="primary" icon="user" htmlType="submit" disabled={submitting} style={{marginRight:"1rem"}}>
                                提交
                            </Button>
                            <Button type="ghost" icon="cloud" disabled={pristine || submitting} onClick={reset} style={{marginRight:"1rem"}}>
                                取消
                            </Button>
                        </Col>
                    </div>
                </form>
                {this.props.adminIndex.error !== undefined && notification.open({
                    message:  this.props.adminIndex.error,
                    description: this.props.adminIndex.error,
                })}
            </Row>
        );
    }
}
Edit.propTypes = {
    editUserInfo:React.PropTypes.func.isRequired,
    handleSubmit:React.PropTypes.func.isRequired,
    pristine:React.PropTypes.bool.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    adminIndex:React.PropTypes.object.isRequired,
    initLoad:React.PropTypes.func.isRequired,
    params:React.PropTypes.object.isRequired
};
/*eslint-disable no-class-assign*/ 
Edit = reduxForm({
    form:"edituserinfo"
})(Edit);
const mapStateToProps = (state)=>{
    /*eslint-disable no-var*/ 
    var initdata;
    if(state.adminIndex.initdata !== undefined)
    {
        initdata = {
            username:state.adminIndex.initdata.name,
            age:state.adminIndex.initdata.age,
            sex:state.adminIndex.initdata.sex,
            hobby:state.adminIndex.initdata.hobby,
            specialty:state.adminIndex.initdata.specialty,
            occupation:state.adminIndex.initdata.occupation
        };
    }
    return{
        adminIndex:state.adminIndex,
        initialValues:initdata   //返回编辑的初始数据
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(UserInfoActions,dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(Edit);