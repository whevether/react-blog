/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {Row, Col,Table,Spin,Button,message} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ArticleActions from '../../../actions/admin/article/article';
class Article extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.fetchArticle();
    }
    componentWillReceiveProps(next)
    {
        if(next.authenticated)
        {
            return next.fetchArticle();
        }
    }
    render()
    {
        /*eslint-disable react/self-closing-comp*/ 
        const columns = [
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                    render: (text,reload) => <Link to={`/admin/article/edit/${reload.id}`}>{text}</Link>,
                },
                 {
                    title: '创建时间',
                    dataIndex: 'createdate',
                    key: 'createdate',
                },
                 {
                    title: '文章类型',
                    dataIndex: 'category',
                    key: 'category',
                },
                 {
                    title: '文章描述',
                    dataIndex: 'desc',
                    key: 'desc',
                },
                {
                    title: '文章标题',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text) => (
                        <span>
                            <Link to={`/admin/article/edit/${text.id}`} className="ant-btn ant-btn-primary" style={{margin:".3rem 0rem"}}><span>编辑</span><i className="anticon anticon-edit"></i></Link>
                            <span className="ant-divider" />
                            <Button  type="dashed" icon="delete" style={{margin:".3rem .5rem",backgroundColor:"#F08080",borderColor:"#F08080",color:"#fff"}} onClick={()=>{this.props.deleteArticle(text.id);}}><span>删除</span></Button>
                            <span className="ant-divider" />
                        </span>
                    ),
                }];  
        return(
            <Row>
                {this.props.adminArticle.isFetching && <h1>正在载入数据<Spin /></h1>}
                <Row><Col lg={12}><Link to="/admin/article/create" className="ant-btn ant-btn-primary" style={{marginBottom:"2rem"}}>添加文章<i className="anticon anticon-plus-square"></i></Link></Col></Row>
                <Row><Table columns={columns} loading={this.props.adminArticle.isFetching} dataSource={this.props.adminArticle.table}></Table> </Row>
                {this.props.adminArticle.msg !== undefined && message.info(this.props.adminArticle.msg)}
            </Row>
        );
    }
}
Article.propTypes = {
    fetchArticle: React.PropTypes.func.isRequired,
    deleteArticle: React.PropTypes.func.isRequired,
    adminArticle: React.PropTypes.object.isRequired
};
const mapStateToProps = (state)=>{
    return {
        adminArticle:state.adminArticle
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ArticleActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Article);