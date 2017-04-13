/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {Row, Col,Table,Spin,Button,message} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CategoryActions from '../../../actions/admin/category/category';
class Category extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.fetchCategory();
    }
    componentWillReceiveProps(next)
    {
        if(next.authenticated)
        {
            return next.fetchCategory();
        }
    }
    render()
    {
        /*eslint-disable react/self-closing-comp*/ 
        const columns = [
                {
                    title: '类型名',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text,reload) => <Link to={`/admin/category/edit/edit/${reload.id}`}>{text}</Link>,
                },
                 {
                    title: '来源',
                    dataIndex: 'path',
                    key: 'path',
                },
                {
                    title: '说明',
                    dataIndex: 'desc',
                    key: 'desc',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text) => (
                        <span>
                            <Link to={`/admin/category/edit/${text.id}`} className="ant-btn ant-btn-primary" style={{margin:".3rem 0rem"}}><span>编辑</span><i className="anticon anticon-edit"></i></Link>
                            <span className="ant-divider" />
                            <Button  type="dashed" icon="delete" style={{margin:".3rem .5rem",backgroundColor:"#F08080",borderColor:"#F08080",color:"#fff"}} onClick={()=>{this.props.deleteCategory(text.id);}}><span>删除</span></Button>
                            <span className="ant-divider" />
                        </span>
                    ),
                }];
        return(
            <Row>
                {this.props.adminCategory.isFetching && <h1>正在载入数据<Spin /></h1>}
                <Row><Col lg={12}><Link to="/admin/category/create" className="ant-btn ant-btn-primary" style={{marginBottom:"2rem"}}>添加分类<i className="anticon anticon-plus-square"></i></Link></Col></Row>
                <Row><Table columns={columns} loading={this.props.adminCategory.isFetching} dataSource={this.props.adminCategory.data}></Table> </Row>
                {this.props.adminCategory.msg !== undefined && message.info(this.props.adminCategory.msg)}
            </Row>
        );
    }
}
Category.propTypes = {
    fetchCategory: React.PropTypes.func.isRequired,
    adminCategory:React.PropTypes.object.isRequired,
    deleteCategory:React.PropTypes.func.isRequired
};
const mapStateToProps = (state)=>{
    return {
        adminCategory:state.adminCategory
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(CategoryActions,dispatch);
};
export default connect(mapStateToProps,mapDispatchToProps)(Category);