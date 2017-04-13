/**
 * Created by Administrator on 2016/12/6 0006.
 */
import React from 'react';
import {Row,Col,Button,notification} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UploadActions from '../../../actions/admin/upload/upload';
export const FileUpload = (props) => {
    const onFormSubmit = (data) => {
        data.preventDefault();
        let formData = new FormData();
        formData.append('title', data.target.title.value);
        formData.append('desc', data.target.desc.value);
        formData.append('file',data.target.file.files[0]);
        props.uploadFiles(formData);
    };
        /*eslint-disable react/self-closing-comp*/ 
    return (
        <Row>
            <form onSubmit={onFormSubmit} className="ant-form">
                <div className="ant-row ant-form-item">
                    <Col xs={{span:24}} sm={{span:3}} className="ant-form-item-label"><label htmlFor="name" >图片标题</label></Col>
                    <Col xs={{span:24}} sm={{span:10}} className="ant-form-item-control">
                        <div className="ant-form-item-control-wrapper">
                            <input type="text" name="title" className="ant-input"/>
                        </div>
                    </Col>
                </div>
               <div className="ant-row ant-form-item">
                    <Col xs={{span:24}} sm={{span:3}} className="ant-form-item-label"><label htmlFor="name" >图片内容</label></Col>
                    <Col xs={{span:24}} sm={{span:10}} className="ant-form-item-control">
                        <div className="ant-form-item-control-wrapper">
                            <input type="text" name="desc" className="ant-input"/>
                        </div>
                    </Col>
                </div>
                <div className="ant-row ant-form-item">
                    <Col xs={{span:24}} sm={{span:3}} className="ant-form-item-label"><label htmlFor="file" >上传图片</label></Col>
                    <Col xs={{span:24}} sm={{span:10}} className="ant-form-item-control">
                        <div tabIndex="500" className="btn-file">
                            <i className="anticon anticon-upload"></i>
                            <span className="hidden-xs">上传</span>
                            <input  type="file" className="file" name="file"/>
                        </div>
                    </Col>
                </div>
                <div className="ant-row ant-form-item">
                    <Col sm={{span:5,offset:3}}>
                        <Button type="primary" icon="poweroff" style={{width:"100%"}} htmlType="submit">提交</Button>
                    </Col>
                </div>     
            </form>
            {props.adminUpload.msg !== "" && notification.open({
                    message:  props.adminUpload.msg,
                    description: props.adminUpload.msg,
                })}
        </Row>
    );
};
FileUpload.propTypes = {
    uploadFiles:React.PropTypes.func.isRequired,
    adminUpload:React.PropTypes.object.isRequired
};
const mapStateToProps = (state)=>{
    return{
        adminUpload: state.adminUpload
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(UploadActions,dispatch);
};
 export default connect(mapStateToProps,mapDispatchToProps)(FileUpload);
