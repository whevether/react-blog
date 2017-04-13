/**
 * Created by Administrator on 2016/12/29 0029.
 * 登出注销
 */
import React,{Component} from 'react';
import * as authActions from '../../actions/auth';
import {connect} from 'react-redux';
class Signout extends Component
{
    constructor(props)
    {
        super(props);
    }
    componentWillMount()
    {
        this.props.signoutUser();
    }
    render()
    {
        return(
          <div>退出登入了......</div>
        );
    }
}
Signout.propTypes = {
    signoutUser:React.PropTypes.func.isRequired
};
export default connect(null,authActions)(Signout);