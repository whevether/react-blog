/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactEditOr from '../../../utils/index'; 
import { Form, DatePicker, Select, Button,Input,notification} from 'antd';
import * as ArticleActions from '../../../actions/admin/article/article';
import _ from 'lodash';
const Option = Select.Option;
const FormItem = Form.Item;

class ArticleEdit extends React.Component {
    constructor(props)
    {
      super(props);
      this.receiveHtml = this.receiveHtml.bind(this);
      this.state = {
            content: "",
            title: "",
            author: "",
            desc: "",
            category: "",
            data: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount()
    {
      this.props.fetchCategory();
      let data = _.find(this.props.adminArticle.table,this.props.params);
      this.setState({
        title:data.title,
        desc:data.desc,
        data:data.content,
        category:data.category,
        author:data.author
      });
    }
    receiveHtml(content)
    {
      this.setState({content:content});
    }
    handleSubmit = (e) => {
      e.preventDefault();
      let url = this.props.params.id;
      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const values = {
          ...fieldsValue,
          'createdate': fieldsValue['createdate'].format('YYYY-MM-DD'),
          'title': fieldsValue['title'],
          'desc': fieldsValue['desc'],
          'author': fieldsValue['author'],
          'category': fieldsValue['category'],
          'editor': this.state.content
        };
        this.props.editArticle(values,url)
        .then(()=>{
          if(this.props.adminArticle.msg !== undefined)
          {
            notification.open({
                    message:  this.props.adminArticle.msg,
                    description: '你成功的保存了信息'
                });
            this.props.form.resetFields();
          }else
          {
            notification.open({
                    message: '存储错误',
                    description: '发生了一个错误'
              });
          }    
        });
      });
    }
  render() {
    const uploadConfig = {
            QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传 
            QINIU_IMG_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求图片的token 
            QINIU_PFOP: {
            url: "http://www.yourServerAddress.com/QiniuPicPersist.do" //七牛持久保存请求地址 
            },
            QINIU_VIDEO_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do", //请求媒体资源的token 
            QINIU_FILE_TOKEN_URL: "http://www.yourServerAddress.com/getQiniuUptoken.do?name=patch", //其他资源的token的获取 
            QINIU_IMG_DOMAIN_URL: "https://image.yourServerAddress.mobi", //图片文件地址的前缀 
            QINIU_DOMAIN_VIDEO_URL: "https://video.yourServerAddress.mobi", //视频文件地址的前缀 
            QINIU_DOMAIN_FILE_URL: "https://static.yourServerAddress.com/", //其他文件地址前缀 
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const eidtLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: '选择时间!!!!' }],
    };
    const stringrules = {
      rules: [{ type:'string',required: true, message: '不能为空!!!!' }],
    };
    /*eslint-disable react/self-closing-comp*/ 
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="文章标题">
          {getFieldDecorator('title',{stringrules,initialValue:this.state.title})(
            <Input placeholder="文章标题"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="文章描述">
          {getFieldDecorator('desc',{stringrules,initialValue:this.state.desc})(
            <Input placeholder="文章描述"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('author',{stringrules,initialValue:this.state.author})(
            <Input placeholder="作者"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="文章类型">
          {getFieldDecorator('category',{stringrules,initialValue:this.state.category})(
            <Select showSearch
                        placeholder="选择类型"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {(this.props.categoryType !== undefined)? this.props.categoryType.map((i,j)=>{return <Option key={j} value={i.name}>{i.name}</Option>;}):<Option value=""></Option>}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          {getFieldDecorator('createdate', config)(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...eidtLayout} label="文章内容">
        {getFieldDecorator('editor')(
          <ReactEditOr
              active={true}
              HtmlContent={this.state.data}
              cbReceiver={this.receiveHtml}
              uploadConfig={uploadConfig}
              FullScreen={true}/> 
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 21, offset: 3 },
          }}
        >
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
            {this.props.adminArticle.error !== undefined && notification.open({
                message:  this.props.adminArticle.error,
                description: this.props.adminArticle.error,
            })}
      </Form>
    );
  }
}
ArticleEdit.propTypes = {
  adminArticle:React.PropTypes.object.isRequired,
  fetchCategory:React.PropTypes.func.isRequired,
  form:React.PropTypes.object.isRequired,
  categoryType:React.PropTypes.arrayOf(Object),
  editArticle:React.PropTypes.func.isRequired,
  params:React.PropTypes.object.isRequired
};
const mapStateToProps  = (state) => {
  return {
    adminArticle:state.adminArticle,
    categoryType:state.adminCategory.data
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ArticleActions,dispatch);
};
const WrappedArticleEditForm = Form.create()(ArticleEdit);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedArticleEditForm);