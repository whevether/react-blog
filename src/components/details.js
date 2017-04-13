import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ServicesActions from '../actions/services';
import {Row,Col,Spin,Icon} from 'antd';
class Details extends React.Component
{
    // 图省事。没有根据id请求服务端数据而是直接用redux 获取之前的数据  不使用父组件传值是因为这个不是父子关系
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.fetchArticleContent(this.props.params.details);
    }
    render()
    {
        const {details,loadAll} = this.props;
        return (
           <Row style={{height:"100vh"}}>
               {loadAll && <Spin />}
               {(details === undefined) && <h1 style={{textAlign:"center"}}>文章没有内容</h1>}
               {(details !== undefined) && <Col md={24} style={{padding:"30px 0px 0px"}}>
                    <div style={{textAlign:"center",backgroundColor:"#9caebf",color:"#fff"}}>
                        <h2 style={{fontSize:"36px",color:"#fff"}}>{details.data.title}</h2>
                    <ul style={{listStyle:"none",fontSize:"19px",display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"10px 15px","flex-wrap":"wrap"}}>
                        <li style={{padding:"10px"}}><span style={{margin:"0px 5px"}}>作者:</span><span style={{margin:"0px 5px"}}>{details.data.author}</span> <Icon type="user"/></li>
                        <li style={{padding:"10px"}}><span style={{margin:"0px 5px"}}>类型:</span><span style={{margin:"0px 5px"}}>{details.data.category}</span> <Icon type="user"/></li>
                        <li style={{padding:"10px"}}><span style={{margin:"0px 5px"}}>时间:</span><span style={{margin:"0px 5px"}}>{details.data.createdate}</span> <Icon type="user"/></li>
                        <li style={{padding:"10px"}}><span style={{margin:"0px 5px"}}>文章简介:</span><span style={{margin:"0px 5px"}}>{details.data.desc}</span><Icon type="user"/></li>
                    </ul>
                    </div>
                    {/*只能这样显示文章内容。 不过容易存在xss 注入漏洞*/}
                    <div className="article-content" dangerouslySetInnerHTML={{__html: details.data.content}}></div>
               </Col> 
               }
            </Row>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        details: state.info.details,
        loadAll: state.info.loadAll
    };
};
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(ServicesActions,dispatch);
};
Details.propTypes = {
    fetchArticleContent: React.PropTypes.func.isRequired,
    details: React.PropTypes.object,
    loadAll: React.PropTypes.bool.isRequired,
    params:React.PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(Details);