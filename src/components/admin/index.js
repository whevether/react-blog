/**
 * Created by keep_wan on 2017/1/14.
 */
import React from 'react';
import {Row, Col,Table,Spin,Button,message} from 'antd';
import {Link} from 'react-router';
class Index extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.fetchUserInfo();
    }
    componentWillReceiveProps(next)
    {
        if(next.authenticated)
        {
            return next.fetchUserInfo();
        }
    }
    render()
    {
        /*eslint-disable react/self-closing-comp*/ 
        const columns = [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text,reload) => <Link to={`/admin/index/edit/${reload.id}`}>{text}</Link>,
                },
                 {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                 {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                }, 
                 {
                    title: '业余爱好',
                    dataIndex: 'hobby',
                    key: 'hobby',
                },
                 {
                    title: '特长',
                    dataIndex: 'specialty',
                    key: 'specialty',
                },
                {
                    title: '职业',
                    dataIndex: 'occupation',
                    key: 'occupation',
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text) => (
                        <span>
                            <Link to={`/admin/index/edituserinfo/${text.id}`} className="ant-btn ant-btn-primary" style={{margin:".3rem 0rem"}}><span>编辑</span><i className="anticon anticon-edit"></i></Link>
                            <span className="ant-divider" />
                            <Button  type="dashed" icon="delete" style={{margin:".3rem .5rem",backgroundColor:"#F08080",borderColor:"#F08080",color:"#fff"}} onClick={()=>{this.props.deleteUserInfo(text.id);}}><span>删除</span></Button>
                            <span className="ant-divider" />
                        </span>
                    ),
                }];  
        return(
            <Row>
                {this.props.adminIndex.isFetching && <h1>正在载入数据<Spin /></h1>}
                <Row><Col lg={12}><Link to="/admin/index/adduserinfo" className="ant-btn ant-btn-primary" style={{marginBottom:"2rem"}}>添加用户信息 <i className="anticon anticon-plus-square"></i></Link></Col></Row>
                <Row><Table columns={columns} loading={this.props.adminIndex.isFetching} dataSource={this.props.adminIndex.data}></Table> </Row>
                {this.props.adminIndex.msg !== undefined && message.info(this.props.adminIndex.msg)}
            </Row>
        );
    }
}
Index.propTypes = {
    adminIndex:React.PropTypes.object.isRequired,
    fetchUserInfo:React.PropTypes.func.isRequired,
    deleteUserInfo:React.PropTypes.func.isRequired
};
export default Index;