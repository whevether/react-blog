import React from 'react';
import {Card} from 'antd';
class About extends React.Component
{
    constructor(props)
    {
        super(props);
              
    }
    render()
    {
     
      return (
        <div style={{height:"100vh"}}>
          <Card title="我是万文峰" >
            <ul>
              <li style={{padding:"10px",fontSize:"18px"}}>
                <span>一个不流入的程序员</span>
                <span>热爱技术</span>
              </li>
              <li style={{padding:"10px",fontSize:"18px"}}>
                <span>tel:</span>
                <span>13265616949</span>
              </li>
              <li style={{padding:"10px",fontSize:"18px"}}>
                <span>qq:</span>
                <span>415494857</span>
              </li>
              <li style={{padding:"10px",fontSize:"18px"}}>
                <a href="https://github.com/whevether">github</a>
              </li>
            </ul>
          </Card>
        </div>
      );
    }
}

export default About;