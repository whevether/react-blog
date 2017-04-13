/**
 * Created by Administrator on 2016/12/6 0006.
 */
import React from 'react';
import {Row,Col, Card,Pagination,Icon,Spin} from 'antd';
import {Link} from 'react-router';
class Services extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.fetchArticle(1,4);
    }
    onChange(current, pageSize) 
    {
        this.props.fetchArticle(current,pageSize);
    }
    render()
    {
        const {count,loadAll,data} = this.props.info;
        return(
                <Row style={{minHeight:"100vh",height:"auto"}}>
                    {loadAll && <Spin size="large" />}
                    <Col sm={24}><h2>文章页面</h2></Col>
                    {(data !== undefined) && data.map((item)=>{
                            return <Col sm={12} key={item.key}>
                                <Card title={'文章标题:'+"-------"+ item.title}  extra={<Link to={`/services/${item.id}`}><span>详情</span></Link>} style={{margin: "1rem 1.2rem"}}>
                                    <p className="article-item"><strong style={{fontSize:"22px"}}>作者:</strong><span style={{padding: "0rem 3rem",fontSize:"16px"}}>{item.author}</span><Icon type="user"/></p>
                                    <p className="article-item"><strong style={{fontSize:"22px"}}>类型:</strong><span style={{padding: "0rem 3rem",fontSize:"16px"}}>{item.category}</span><Icon type="tag"/></p>
                                    <p className="article-item"><strong style={{fontSize:"22px"}}>简介:</strong><span style={{padding: "0rem 3rem",fontSize:"16px"}}>{item.desc}</span><Icon type="book"/></p>
                                    <p className="article-item"><strong style={{fontSize:"22px"}}>更新时间:</strong><span style={{padding: "0rem 3rem",fontSize:"16px"}}>{item.createdate}</span> <Icon type="star"/></p>
                                </Card>
                            </Col>;
                        })
                    }
                    {/*<Col span={6}>
                        {(this.props.info.length !==0)? <div dangerouslySetInnerHTML={{__html: this.props.info[0].content}}></div> : ''}
                    </Col>*/}
                    <Pagination style={{marginTop:"1.5rem",marginLeft:"1rem"}}
                        defaultPageSize={4}
                        defaultCurrent={1}
                        onChange={this.onChange.bind(this)}
                        total={count}
                    />
                </Row>
        );
    }
}
Services.propTypes = {
    fetchArticle:React.PropTypes.func.isRequired,
    info:React.PropTypes.object.isRequired
};
export default Services;