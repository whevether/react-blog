/**
 * Created by Administrator on 2016/11/17 0017.
 */
import React from 'react';
/*eslint-disable  no-unused-vars*/
import Gallery from 'react-photo-gallery';
import LightBox from 'react-images';
import {Pagination,Spin} from 'antd';

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        // 页面初始的时候数据
       this.props.actions.fetchImageData(1,12);
    }
    onChange(current, pageSize) 
    {
        this.props.actions.fetchImageData(current, pageSize);
    }
    render()
    {
       const {photos,count,loadeAll} = this.props.home;
        return(
            <div className="row">
                {loadeAll && <Spin />}
                {(photos === undefined || photos.length === 0) && <h1 style={{textAlign:"center"}}>没有数据</h1>}
                {(photos !== undefined) &&<Gallery  photos={photos}/>}
                <Pagination style={{marginTop:"1.5rem"}}
                    defaultPageSize={12}
                    defaultCurrent={1}
                    onChange={this.onChange.bind(this)}
                    total={count}
                />
            </div>
        );
    }
}
Home.propTypes = {
    home:React.PropTypes.object.isRequired,
    actions:React.PropTypes.object.isRequired
};
export default Home;