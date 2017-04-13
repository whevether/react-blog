/**
 * Created by Administrator on 2016/11/28 0028.
 */
import React from 'react';
import {Spin,Col,Row} from 'antd';
class Protfilio extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    componentDidMount()
    {
        this.props.getGithubRepos();
    }
    handleRefresh(e)
    {
        e.preventDefault();
        this.props.getGithubRepos();
    }
    render()
    {
        const {result,isFetching,error,loading}  = this.props.protfolio;
        return(
            <Row>
                <Col span={18} push={3}>
                    <div className="repos">
                        {isFetching && result === undefined &&
                           <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}}>
                               <Spin />
                           </div>
                        }
                        {isFetching && error && result.length === 0 &&
                            <h3>没有获取数据错误</h3>

                        }
                        {!isFetching && !error && result.length === 0 &&
                            <h3>数据为空</h3>
                        } 
                        {!isFetching && !error && result.length > 0 &&
                            <div style={{opacity:isFetching?.5:1}} className="list-group">
                                    {result.map((obj,i)=>
                                        <div className="list-group-item" key={i}>
                                            <a href={obj.html_url}>{obj.name}</a>
                                            {obj.description}
                                        </div>
                                    )}
                                <p>{loading}</p>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}


Protfilio.propTypes = {
    getGithubRepos:React.PropTypes.func.isRequired,
    protfolio:React.PropTypes.object.isRequired
};
export default Protfilio;